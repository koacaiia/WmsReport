
function excelConvert(e){
    try{
        const file= e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e){
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array',cellDates: true,dateNF:"yyyy-mm-dd"});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, {header:1});
            excelTable(json);
            
        };
        reader.readAsArrayBuffer(file);

    }catch(e){
        alert(e);
    };
}

function excelTable(value){
    console.log(value);

}
function generateData(data){
//  const data = document.querySelector('#excel_data').value;
 const tableDiv = document.querySelector('#excel_table');
 console.log(data);
 const rows = data.split('\n');
 const table= document.createElement('table');
 for (const row of rows){
     const tr = document.createElement('tr');
     const columns = row.split('\t');
     for (const column of columns){
         const td = document.createElement('td');
         td.textContent = column;
         tr.appendChild(td);
     }
     table.appendChild(tr);
 }
    tableDiv.innerHTML = '';
    tableDiv.appendChild(table);
}
function removeTable(){
    const tableDiv = document.querySelector('#excel_table');
    tableDiv.innerHTML = '';
}
function handlePaste(event){
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    console.log('Pasted data:', pastedData);
    generateData(pastedData);
}
