const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'employee_trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('WORKING!!!!!!!')
//   runSearch();
});

// const runSearch = () => {
//   inquirer
//     .prompt({
//       name: 'action',
//       type: 'rawlist',
//       message: 'What would you like to do?',
//       choices: [
//         'Find songs by artist',
//         'Find all artists who appear more than once',
//         'Find data within a specific range',
//         'Search for a specific song',
//         'Find artists with a top song and top album in the same year',
//       ],
//     })
//     .then((answer) => {
//       switch (answer.action) {
//         case 'Find songs by artist':
//           artistSearch();
//           break;

//         case 'Find all artists who appear more than once':
//           multiSearch();
//           break;

//         case 'Find data within a specific range':
//           rangeSearch();
//           break;

//         case 'Search for a specific song':
//           songSearch();
//           break;

//         case 'Find artists with a top song and top album in the same year':
//           songAndAlbumSearch();
//           break;

//         default:
//           console.log(`Invalid action: ${answer.action}`);
//           break;
//       }
//     });
// };