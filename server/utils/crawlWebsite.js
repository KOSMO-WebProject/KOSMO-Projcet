const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 디버깅을 위해 브라우저 띄움
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1366,
    height: 768,
  });

  const url = "https://www.musinsa.com/main/musinsa/ranking?storeCode=musinsa&sectionId=200&categoryCode=003000&gf=M";
  await page.goto(url, {
    waitUntil: "domcontentloaded", // DOM이 로드될 때까지 대기
  });

  // 스크롤을 끝까지 진행하여 모든 이미지 로드
  const autoScroll = async (page) => {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100; // 스크롤 간격
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100); // 100ms 간격으로 스크롤
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
  $(".sc-1y072n9-0.jdzDMq").each((index, element) => {
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
      .map((i, el) => $(el).text().trim())
      .get();

    // 이미지 URL 추출
    const imageUrls = $(element)
      .find("img.sc-1m4cyao-4")
      .map((i, el) => $(el).attr("src"))
      .get();

    // 제품명, 가격, 이미지 URL을 매핑
    productNames.forEach((name, i) => {
      const price = productPrices[i] || "가격 정보 없음";
      const imageUrl = imageUrls[i] || "이미지 없음";
      products.push({ name, price, imageUrl });
    });
  });

  console.log("Extracted Products:", products);

  await browser.close();
})();