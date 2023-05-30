const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('mySecondChart');
const ctx3 = document.getElementById('mythirdChart');
const ctx4 = document.getElementById('Chart4');
const tabela = document.getElementById('tabela');
const tabela2 = document.getElementById('tabela2');
const tabela3 = document.getElementById('tabela3');
const Ematendimento = document.getElementById('Chart7');
const Ematraso = document.getElementById('Chart8');
const concluidas = document.getElementById('Chart9');
const ctx1 = document.getElementById('graph1');
const ctx5 = document.getElementById('graph2');
const ctx7 = document.getElementById('Card1');
const ctx6 = document.getElementById('graph3');
const tabela4 = document.getElementById('tabela4')
const endPoint1 = "https://megazord-dashboard.onrender.com/Dash_Processo/"
const endPoint2 = "https://megazord-dashboard.onrender.com/Dash_ProcessoxArea/"
const endPoint3 = "https://megazord-dashboard.onrender.com/Card_Processos/"
const endPoint4 = "https://megazord-dashboard.onrender.com/Dash_PlanosMitigantes/"
const endPoint = "https://megazord-dashboard.onrender.com/Dash_IncidenteArea/"
const PoliManu = "https://megazord-dashboard.onrender.com/Dash_Politicas_Manuais/"
const normas = "https://megazord-dashboard.onrender.com/Dash_Normas/" 
const RadarCon = "https://megazord-dashboard.onrender.com/Dash_RadarConformidade/"
const planos = "https://megazord-dashboard.onrender.com/Tabela_Tarefas/"

const legendas = []
const CountAreas = []
monName = new Array ("jan", "fev", "mar", "abr", "mai", "jun","jul", "ago", "out", "nov", "dez")
statTarefa = new Array ("","","Andamento","","Concluida")

let nmbrStatus =[0,0,0]
let nmbrStatusRadar =[0,0,0]

const result = fetch(endPoint)

.then(res => res.json())
.then(dados =>{
dados.map(item => {
legendas.push(item.Area)
CountAreas.push(item.QtdeIncidentes)
chart_1.update()
chart_2.update()
}) 
}) 

const resultPoliManu = fetch(PoliManu)
.then(res => res.json())
.then(dados =>{
    dados.map(item =>{
        dataresult = new Date(item.documentoprazovalidade)
        difdate = dataresult - new Date()
        difdate = difdate / (1000 * 60 * 60 * 24)
        if (difdate < 0){
            nmbrStatus[0] = nmbrStatus[0] + 1;
        } else if (difdate > 90){
            nmbrStatus[1] = nmbrStatus[1] + 1;
        }else{
            nmbrStatus[2] = nmbrStatus[2] + 1;
        }
        

        const newRow = tabela2.insertRow()
        const cell1 = newRow.insertCell()
        const cell2 = newRow.insertCell()
        const cell3 = newRow.insertCell()
        cell1.innerHTML = item.documentoid
        cell2.innerHTML = item.documentonome
        cell3.innerHTML = monName[dataresult.getMonth()] + '/' + dataresult.getFullYear()

        chart_3.update()
    })
})

const resultNormas = fetch(normas)
.then(res => res.json())
.then(dados =>{
    ctx4.innerHTML = dados.length
    dados.forEach(row => {
        const newRow = tabela.insertRow()
        const cell1 = newRow.insertCell()
        const cell2 = newRow.insertCell()
        cell1.innerHTML = row.normanome
        cell2.innerHTML = row.qtusuario
})
})

const resultplanos = fetch(planos)
.then(res => res.json())
.then(dados =>{
    dados.forEach(row => {
        const newRow = tabela4.insertRow()
        const cell1 = newRow.insertCell()
        const cell2 = newRow.insertCell()
        const cell3 = newRow.insertCell()
        const cell4 = newRow.insertCell()
        const cell5 = newRow.insertCell()
        cell1.innerHTML = row.ID
        cell2.innerHTML = row.Status
        cell3.innerHTML = row.Plano
        cell4.innerHTML = row.Area
        cell5.innerHTML = row.Prazo
})
})

const resultRadarCon = fetch(RadarCon)
.then(res => res.json())
.then(dados =>{
    dados.forEach(row =>{
        dataresult = new Date(row.tarefaprevtermino)
        difdate = dataresult - new Date()
        
        if (row.tarefastatustarefa === 2 && difdate < 0){
            nmbrStatusRadar[0] = nmbrStatusRadar[0] + 1
        }else if (row.tarefastatustarefa === 4){
            nmbrStatusRadar[1] = nmbrStatusRadar[1] + 1
        }else if (row.tarefastatustarefa === 2){
            nmbrStatusRadar[2] = nmbrStatusRadar[2] + 1
        }
        const newRow = tabela3.insertRow()
        const cell1 = newRow.insertCell()
        const cell2 = newRow.insertCell()
        const cell3 = newRow.insertCell()
        const cell4 = newRow.insertCell()
        const cell5 = newRow.insertCell()

        cell1.innerHTML = row.tarefaid
        cell2.innerHTML = row.tarefadescricao
        cell3.innerHTML = row.sbusuarioid
        cell4.innerHTML = row.tarefaprevtermino
        cell5.innerHTML = statTarefa[row.tarefastatustarefa]

        Ematendimento.innerHTML = nmbrStatusRadar[2]
        Ematraso.innerHTML = nmbrStatusRadar[0]
        concluidas.innerHTML = nmbrStatusRadar[1]

        })
    })

let chart_1 = new Chart(ctx, {
type: 'bar',
data: {
labels: legendas,
datasets: [{
label: 'Incidentes por area',
data: CountAreas,
borderWidth: 1,
backgroundColor: ['#95bfe6',
                '#78aee2',
                '#439cea',
                '#348fdf',
                '#2284d9',
                '#006ac5',
                ],
borderColor: '#000' 
}]
},
options: {
        
    scales: {
    y: {
    beginAtZero: true
    }
    },
    plugins: {
          legend: {
            display: false,
            labels: {
                font:{
                    size: 50
                }
            }
          },
          datalabels:{
            color: '#FFF',
            font: {
                size: 30
            }
          }
    }
    
    },
    plugins: [ChartDataLabels]
    });

let chart_2 = new Chart(ctx2, {
type: 'doughnut',
data: {
labels:legendas,
datasets: [{
label: 'Incidentes por area',
data: CountAreas,
borderWidth: 1,
backgroundColor: ['#95bfe6',
                '#78aee2',
                '#439cea',
                '#348fdf',
                '#2284d9',
                '#006ac5',
                ],
borderColor: '#000' 
}],

}});

let chart_3 = new Chart(ctx3, {
    type: 'bar',
    data: {
    labels: ["Vencido", "Vigente", "A vencer"],
    datasets: [{
    label: 'Políticas e Manuais Vigentes',
    data: nmbrStatus,
    borderWidth: 1,
    backgroundColor: ['#95bfe6',
                    '#78aee2',
                    '#439cea',
                    '#348fdf',
                    '#2284d9',
                    '#006ac5',
                    ],
    borderColor: '#000' 
    }]
    },
    options: {
        
        scales: {
        y: {
        beginAtZero: true
        }
        },
        plugins: {
              legend: {
                display: false,
                labels: {
                    font:{
                        size: 50
                    }
                }
              },
              datalabels:{
                color: '#FFF',
                font: {
                    size: 30
                }
              }
        }
        
        },
        plugins: [ChartDataLabels]
        });

    //////////////////////////////////////////////////////////////////////////////////////////////////////
const result3 = fetch(endPoint3)
.then(response => response.json())
.then(data => {
    console.log(data)
ctx7.innerHTML = data[0].Processos_mapeados

})

const result1 = fetch(endPoint1)
.then(response => response.json())
.then(data => {
    const months = data.map(obj => obj.Mes)
    const baixoData = data.map(obj => obj.Baixo)
    const moderadoData = data.map(obj => obj.Moderado)
    const altoData = data.map(obj => obj.Alto)
    const muitoBaixoData = data.map(obj => obj['Muito Baixo'])
    const muitoAltoData = data.map(obj => obj['Muito Alto'])
    const chartData1 = {
    labels: months,
    datasets: [
        {
        label: 'Muito Baixo',
        data: muitoBaixoData,
        backgroundColor: '#66bfec',
        },
        {
        label: 'Baixo',
        data: baixoData,
        backgroundColor: '#2499EA',
        },
        {
        label: 'Moderado',
        data: moderadoData,
        backgroundColor: '#2483ea',
        },
        {
        label: 'Alto',
        data: altoData,
        backgroundColor: '#2839d9',
        },
        {
        label: 'Muito Alto',
        data: muitoAltoData,
        backgroundColor: '#0413a2',
        },
    ],
    };
    const chartConfig = {
    type: 'bar',
    data: chartData1,
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        datalabels:{
            color: '#FFF',
            font: {
                size: 15
            }
          }
        },
        scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            ticks: {
            beginAtZero: true,
            },
        },
        },
    },
    plugins: [ChartDataLabels]
    };
    const graph1 = new Chart(document.getElementById('graph1'), chartConfig);
})
.catch(error => console.error(error));

const result2 = fetch(endPoint2)
.then(response => response.json())
.then(data => {
    const areasID =   {
    1: 'Juridico',
    2: 'Operacional',
    3: 'Financeiro',
    4: 'RH',
    5: 'Comercial',
    6: 'Administrativo'
    };
    data.forEach((obj) => {
    obj.Area = areasID[obj.Area];
    });
    const areas = data.map(obj => obj.Area)
    const baixoData = data.map(obj => obj.Baixo)
    const moderadoData = data.map(obj => obj.Moderado)
    const altoData = data.map(obj => obj.Alto)
    const muitoBaixoData = data.map(obj => obj['Muito Baixo'])
    const muitoAltoData = data.map(obj => obj['Muito Alto'])
    //graph1.update()

    const chartData2 = {
    labels: areas,
    datasets: [
        {
        label: 'Muito Baixo',
        data: muitoBaixoData,
        backgroundColor: '#66bfec',
        },
        {
        label: 'Baixo',
        data: baixoData,
        backgroundColor: '#2499EA',
        },
        {
        label: 'Moderado',
        data: moderadoData,
        backgroundColor: '#2483ea',
        },
        {
        label: 'Alto',
        data: altoData,
        backgroundColor: '#2839d9',
        },
        {
        label: 'Muito Alto',
        data: muitoAltoData,
        backgroundColor: '#0413a2',
        },
    ],
    };
    const chartConfig = {
    type: 'bar',
    data: chartData2,
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        datalabels:{
            color: '#FFF',
            font: {
                size: 20
            }
          }
        },
        scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            ticks: {
            beginAtZero: true,
            },
        },
        },
    },
    plugins: [ChartDataLabels]
    };
    const graph2 = new Chart(document.getElementById('graph2'), chartConfig);
})
.catch(error => console.error(error));

const result4 = fetch(endPoint4)
.then(response => response.json())
.then(data => {
    const months = data.map(obj => obj['mes_criacao'])
    const naoiniciadoData = data.map(obj => obj['Nao iniciado'])
    const emandamentoData = data.map(obj => obj['Em andamento'])
    const emaprovacaoData = data.map(obj => obj['Em aprovacao'])
    const concluidoData = data.map(obj => obj.Concluido)
    const canceladoData = data.map(obj => obj.Cancelado)
    const chartData3 = {
    labels: months,
    datasets: [
        {
        label: 'Nao iniciado',
        data: naoiniciadoData,
        backgroundColor: '#66bfec',
        },
        {
        label: 'Em andamento',
        data: emandamentoData,
        backgroundColor: '#2499EA',
        },
        {
        label: 'Em aprovacao',
        data: emaprovacaoData,
        backgroundColor: '#2483ea',
        },
        {
        label: 'Concluido',
        data: concluidoData,
        backgroundColor: '#2839d9',
        },
        {
        label: 'Cancelado',
        data: canceladoData,
        backgroundColor: '#d42f0c',
        },
    ],
    };
    const chartConfig = {
        type: 'bar',
        data: chartData3,
        options: {
            plugins: {
                datalabels:{
                    color: '#FFF',
                    font: {
                        size: 20
                    }
                  }
                },
            responsive: true,
             scales: {
            x: {
            stacked: true,
            },
            y: {
            stacked: true,
            ticks: {
                beginAtZero: true,
            },
            },
        },
        },
        plugins: [ChartDataLabels],
        legend: {
        position: 'top',
        }
    };
    const graph3 = new Chart(document.getElementById('graph3'), chartConfig);
    })  

    function exportar() {
        var tagEspecifica = document.getElementById('tabela');
      
        if (tagEspecifica) {
          var htmlContent = tagEspecifica.innerHTML;
          var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
          saveAs(blob, 'chart_export.html');
        }
      }

      function exportar() {
        const table = document.getElementById('tabela4');
        const rows = table.getElementsByTagName('tr');
        const csvContent = [];
        for (const row of rows) {
            const rowData = [];
            const cells = row.getElementsByTagName('td');
            for (const cell of cells) {
                rowData.push(cell.textContent);
            }
            csvContent.push(rowData.join(','));
        }
        const csvString = csvContent.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'table.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function exportarLei() {
        const table = document.getElementById('tabela');
        const rows = table.getElementsByTagName('tr');
        const csvContent = [];
        for (const row of rows) {
            const rowData = [];
            const cells = row.getElementsByTagName('td');
            for (const cell of cells) {
                rowData.push(cell.textContent);
            }
            csvContent.push(rowData.join(','));
        }
        const csvString = csvContent.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'table.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function exportarPoliticas() {
        const table = document.getElementById('tabela2');
        const rows = table.getElementsByTagName('tr');
        const csvContent = [];
        for (const row of rows) {
            const rowData = [];
            const cells = row.getElementsByTagName('td');
            for (const cell of cells) {
                rowData.push(cell.textContent);
            }
            csvContent.push(rowData.join(','));
        }
        const csvString = csvContent.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'table.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function exportarDemandas() {
        const table = document.getElementById('tabela3');
        const rows = table.getElementsByTagName('tr');
        const csvContent = [];
        for (const row of rows) {
            const rowData = [];
            const cells = row.getElementsByTagName('td');
            for (const cell of cells) {
                rowData.push(cell.textContent);
            }
            csvContent.push(rowData.join(','));
        }
        const csvString = csvContent.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'table.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


