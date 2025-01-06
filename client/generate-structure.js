const fs = require('fs');
const path = require('path');

<<<<<<< HEAD
// 파일 및 폴더 구조 정의
=======
>>>>>>> develop
const structure = {
  src: {
    components: {
      Auth: {
<<<<<<< HEAD
        Login: {
          'LoginForm.jsx': 'Component for rendering the login form UI',
          'LoginForm.css': 'CSS styles for LoginForm component',
          'SocialLogin.jsx': 'Handles UI for social login buttons and interactions',
          'SocialLogin.css': 'CSS styles for SocialLogin component',
        },
        Signup: {
          'SignupForm.jsx': 'Component for rendering the signup form UI',
          'SignupForm.css': 'CSS styles for SignupForm component',
        },
        PasswordRecovery: {
          'PasswordRecoveryForm.jsx': 'UI for password recovery form',
          'PasswordRecoveryForm.css': 'CSS styles for PasswordRecoveryForm component',
        },
      },
      Header: {
        'Header.jsx': 'Component for header section of the application',
        'Header.css': 'CSS styles for Header component',
        'HeaderMenu.jsx': 'Handles dropdowns and menu logic',
        'HeaderMenu.css': 'CSS styles for HeaderMenu component',
      },
      Footer: {
        'Footer.jsx': 'Component for footer section of the application',
        'Footer.css': 'CSS styles for Footer component',
      },
      Community: {
        'Notice.jsx': 'Component for rendering notice list and details',
        'Notice.css': 'CSS styles for Notice component',
        'QnA.jsx': 'Component for Q&A functionality',
        'QnA.css': 'CSS styles for QnA component',
        'CommunityBoard.jsx': 'Component for rendering community posts and interactions',
        'CommunityBoard.css': 'CSS styles for CommunityBoard component',
      },
      Mypage: {
        'Mypage.jsx': 'Component for the user\'s profile page',
        'Mypage.css': 'CSS styles for Mypage component',
        'PasswordProtectedLanding.jsx': 'Component for password-protected landing within Mypage',
        'PasswordProtectedLanding.css': 'CSS styles for PasswordProtectedLanding component',
      },
    },
    pages: {
      'HomePage.jsx': 'Landing page showing introductory content',
      'HomePage.css': 'CSS styles for HomePage',
      'LoginPage.jsx': 'Page for login and authentication',
      'LoginPage.css': 'CSS styles for LoginPage',
      'SignupPage.jsx': 'Page for user registration',
      'SignupPage.css': 'CSS styles for SignupPage',
      'PasswordRecoveryPage.jsx': 'Page for password recovery process',
      'PasswordRecoveryPage.css': 'CSS styles for PasswordRecoveryPage',
      'NoticePage.jsx': 'Page for notices and announcements',
      'NoticePage.css': 'CSS styles for NoticePage',
      'QnAPage.jsx': 'Page for Q&A section',
      'QnAPage.css': 'CSS styles for QnAPage',
      'CommunityPage.jsx': 'Page for community interactions',
      'CommunityPage.css': 'CSS styles for CommunityPage',
      'ShopLandingPage.jsx': 'Page for shop landing with products',
      'ShopLandingPage.css': 'CSS styles for ShopLandingPage',
      'DetailLandingPage.jsx': 'Page displaying a detailed list of products',
      'DetailLandingPage.css': 'CSS styles for DetailLandingPage',
      'DetailPage.jsx': 'Page for product details',
      'DetailPage.css': 'CSS styles for DetailPage',
      'CartPage.jsx': 'Page displaying the shopping cart',
      'CartPage.css': 'CSS styles for CartPage',
    },
    'App.jsx': 'Main application entry component, contains route definitions',
    'App.css': 'Global styles for the application',
    'index.js': 'Application entry point, rendering the React application',
  },
};

// 재귀적으로 폴더와 파일 생성
const createStructure = (base, structure) => {
  for (const key in structure) {
    const fullPath = path.join(base, key);
    if (typeof structure[key] === 'string') {
      // 파일 생성
      fs.writeFileSync(fullPath, `// ${structure[key]}\n`);
    } else {
      // 폴더 생성 후 재귀 호출
      if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
      createStructure(fullPath, structure[key]);
    }
  }
};

// 실행
createStructure('.', structure);
console.log('폴더 및 파일 구조가 성공적으로 생성되었습니다.');
=======
        Login: ['LoginForm.jsx', 'LoginForm.css', 'SocialLogin.jsx', 'SocialLogin.css'],
        Signup: ['SignupForm.jsx', 'SignupForm.css'],
        PasswordRecovery: ['PasswordRecoveryForm.jsx', 'PasswordRecoveryForm.css'],
      },
      Header: ['Header.jsx', 'Header.css', 'HeaderMenu.jsx', 'HeaderMenu.css'],
      Footer: ['Footer.jsx', 'Footer.css'],
      Community: ['Notice.jsx', 'Notice.css', 'QnA.jsx', 'QnA.css', 'CommunityBoard.jsx', 'CommunityBoard.css'],
      Mypage: ['Mypage.jsx', 'Mypage.css', 'PasswordProtectedLanding.jsx', 'PasswordProtectedLanding.css'],
    },
    pages: [
      'HomePage.jsx',
      'HomePage.css',
      'LoginPage.jsx',
      'LoginPage.css',
      'SignupPage.jsx',
      'SignupPage.css',
      'PasswordRecoveryPage.jsx',
      'PasswordRecoveryPage.css',
      'NoticePage.jsx',
      'NoticePage.css',
      'QnAPage.jsx',
      'QnAPage.css',
      'CommunityPage.jsx',
      'CommunityPage.css',
      'ShopLandingPage.jsx',
      'ShopLandingPage.css',
      'DetailLandingPage.jsx',
      'DetailLandingPage.css',
      'DetailPage.jsx',
      'DetailPage.css',
      'CartPage.jsx',
      'CartPage.css',
    ],
    global: ['App.jsx', 'App.css', 'index.js'],
  },
};

function createFiles(basePath, structure) {
  for (const key in structure) {
    const currentPath = path.join(basePath, key);
    if (Array.isArray(structure[key])) {
      if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath, { recursive: true });
      structure[key].forEach((file) => {
        const filePath = path.join(currentPath, file);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, `// ${file} created`, 'utf8');
        }
      });
    } else {
      if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath, { recursive: true });
      createFiles(currentPath, structure[key]);
    }
  }
}

const basePath = path.join(__dirname, 'src');
createFiles(basePath, structure.src);

console.log('Project structure has been generated!');
>>>>>>> develop
