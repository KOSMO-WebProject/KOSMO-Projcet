const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
const csv = require("csv-writer").createObjectCsvWriter;
const iconv = require("iconv-lite");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 디버깅을 위해 브라우저 띄움
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  const url =
    "https://www.musinsa.com/main/musinsa/ranking?storeCode=musinsa&sectionId=200&categoryCode=004003&gf=A";
  await page.goto(url, {
    waitUntil: "domcontentloaded", // DOM이 로드될 때까지 대기
  });
  // 스크롤을 끝까지 진행하여 모든 이미지 로드
  const autoScroll = async (page) => {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const distance = 100; // 스크롤 간격
        const duration = 10000; // 10초 동안 스크롤
        const startTime = Date.now();
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          if (Date.now() - startTime >= duration) {
            clearInterval(timer);
            resolve();
          }
        }, 200); // 200ms 간격으로 스크롤 시간 조절
      });
    });
  };
  await autoScroll(page); // 스크롤 실행
  // #commonLayoutContents > article 요소가 로드될 때까지 대기
  await page.waitForSelector("#commonLayoutContents > article", {
    timeout: 10000,
  });

  // 페이지 HTML 가져오기
  const content = await page.content();
  const $ = cheerio.load(content);
  // .sc-1y072n9-0.jdzDMq 태그 내부의 제품명, 가격, 이미지 추출
  const products = [];
  let productCount = 0;
  let count = 608;
  $(".sc-1y072n9-0.jdzDMq").each((index, element) => {
    if (productCount >= 30) return false; // 30개 제품 정보 제한
    // 제품명 리스트 추출
    const productNames = $(element)
      .find(
        "p.text-body_13px_reg.line-clamp-2.break-all.whitespace-break-spaces.text-black.font-pretendard"
      )
      .map((i, el) => $(el).text().trim())
      .get();
    // 가격 리스트 추출
    const productPrices = $(element)
      .find(
        "span.text-body_13px_semi.sc-1m4cyao-12.fYDlTs.text-black.font-pretendard"
      )
      .map((i, el) => {
        const productPriceText = $(el)
          .text()
          .trim()
          .replace(/[^0-9]/g, ""); // 숫자만 남김
        return Number(productPriceText);
      })
      .get();

    // 이미지 URL 추출
    const imageUrls = $(element)
      .find("img.sc-1m4cyao-4")
      .map((i, el) => $(el).attr("src"))
      .get();
    // 제품명, 가격, 이미지 URL을 매핑
    productNames.forEach((name, i) => {
      const price = productPrices[i] || "가격 정보 없음";
      const img_url = imageUrls[i] || "이미지 없음";

      products.push({
        product_no: count,
        name,
        price,
        stock: 50,
        img_url,
        category_no: 27,
      });
      count++;
      productCount++;
    });
  });

  // JSON 파일로 저장
  const jsonPath = "숄더백.json";
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf8");

  console.log("JSON 파일 생성 완료");
  await browser.close();
})();
