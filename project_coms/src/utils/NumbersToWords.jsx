// // numberToWordsIndian.js

// const numberToWordsIndian = (number) => {
//     const units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

//     const getUnitName = (n) => units[n] || '';
//     const getTeenName = (n) => teens[n - 11] || '';
//     const getTensName = (n) => tens[Math.floor(n / 10) - 1] || '';
//     const getHundredsName = (n) => n ? `${units[Math.floor(n / 100)]} Hundred` : '';

//     function convertHundreds(num) {
//         let str = '';
//         if (num > 99) {
//             str += getHundredsName(num) + ' ';
//             num %= 100;
//         }
//         if (num > 10 && num < 20) {
//             str += getTeenName(num) + ' ';
//         } else {
//             str += getTensName(num - (num % 10)) + ' ';
//             str += getUnitName(num % 10) + ' ';
//         }
//         return str.trim();
//     }

//     function convertNumber(num) {
//         if (num === 0) return 'Zero';

//         let str = '';
//         let i = 0;
//         let numString = num.toString();
//         let len = numString.length;

//         // Handle the crore part
//         if (len > 7) {
//             const crorePart = Math.floor(num / 10000000);
//             str += convertHundreds(crorePart) + ' Crore ';
//             num %= 10000000;
//         }

//         // Handle the lakh part
//         if (len > 5) {
//             const lakhPart = Math.floor(num / 100000);
//             str += convertHundreds(lakhPart) + ' Lakh ';
//             num %= 100000;
//         }

//         // Handle the thousand part
//         if (len > 3) {
//             const thousandPart = Math.floor(num / 1000);
//             str += convertHundreds(thousandPart) + ' Thousand ';
//             num %= 1000;
//         }

//         // Handle the remaining part (less than 1000)
//         str += convertHundreds(num);

//         // Remove unnecessary zeros and trailing spaces
//         str = str.trim().replace(/\s{2,}/g, ' ').replace(/Zero\s+$/, '').replace(/\s+Zero$/, '');

//         return str + ' Rupees Only';
//     }

//     return convertNumber(number);
// };

// export default numberToWordsIndian;

const numberToWordsIndian = (number) => {
    const units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

    const getUnitName = (n) => units[n] || '';
    const getTeenName = (n) => teens[n - 11] || '';
    const getTensName = (n) => tens[Math.floor(n / 10) - 1] || '';
    const getHundredsName = (n) => n ? `${units[Math.floor(n / 100)]} Hundred` : '';

    function convertHundreds(num) {
        let str = '';
        if (num > 99) {
            str += getHundredsName(num) + ' ';
            num %= 100;
        }
        if (num > 10 && num < 20) {
            str += getTeenName(num) + ' ';
        } else {
            str += getTensName(num - (num % 10)) + ' ';
            str += getUnitName(num % 10) + ' ';
        }
        return str.trim();
    }

    function convertNumber(num) {
        if (num === 0) return 'Zero';

        let str = '';
        let numString = num.toString();
        let len = numString.length;

        // Handle the crore part
        if (len > 7) {
            const crorePart = Math.floor(num / 10000000);
            str += convertHundreds(crorePart) + ' Crore ';
            num %= 10000000;
        }

        // Handle the lakh part
        if (len > 5) {
            const lakhPart = Math.floor(num / 100000);
            str += convertHundreds(lakhPart) + ' Lakh ';
            num %= 100000;
        }

        // Handle the thousand part
        if (len > 3) {
            const thousandPart = Math.floor(num / 1000);
            str += convertHundreds(thousandPart) + ' Thousand ';
            num %= 1000;
        }

        // Handle the remaining part (less than 1000)
        str += convertHundreds(num);

        // Remove unnecessary zeros and trailing spaces
        str = str.trim().replace(/\s{2,}/g, ' ').replace(/Zero\s+$/, '').replace(/\s+Zero$/, '');

        return str.trim();
    }

    function convertFractionalPart(fraction) {
        let fractionalStr = '';
        if (fraction > 0) {
            fractionalStr += convertHundreds(fraction) + ' Paise';
        }
        return fractionalStr;
    }

    const [integerPart, fractionalPart] = number.toString().split('.').map(num => parseInt(num, 10));

    let result = convertNumber(integerPart) + ' Rupees Only';

    if (fractionalPart > 0) {
        result = result.replace('Only', '');
        result += ' and ' + convertFractionalPart(fractionalPart) + ' Only';
    }

    return result;
};

export default numberToWordsIndian;

