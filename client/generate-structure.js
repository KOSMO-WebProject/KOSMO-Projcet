const fs = require('fs');
const path = require('path');

const structure = {
  src: {
    components: {
      Auth: {
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
