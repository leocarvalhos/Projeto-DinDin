export default function formatedCurrency(value: any) {
    let currency = Number(value).toFixed(2).split('.');
    currency[0] = 'R$ ' + currency[0].split(/(?=(?:...)*$)/).join('.');
    return currency.join(',');
}