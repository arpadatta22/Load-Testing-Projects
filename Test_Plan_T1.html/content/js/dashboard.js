/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6438356164383562, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/career-16"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-20"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-15"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-21"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-22"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-17"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/career-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/career-11"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/career-14"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-18"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-14"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-15"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-11"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products-12"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-16"], "isController": false}, {"data": [0.5, 500, 1500, "HTTP Request-15"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-14"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-13"], "isController": false}, {"data": [0.5, 500, 1500, "HTTP Request-19"], "isController": false}, {"data": [0.5, 500, 1500, "HTTP Request-18"], "isController": false}, {"data": [0.5, 500, 1500, "HTTP Request-17"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-12"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-11"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-10"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/career"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "https://www.banglapuzzle.com/about-1"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "https://www.banglapuzzle.com/about-2"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-5"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-6"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about-3"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-9"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-22"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about-7"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-21"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-8"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-20"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-38"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-39"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-30"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about-31"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-32"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-33"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-34"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-35"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-36"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-37"], "isController": false}, {"data": [0.5, 500, 1500, "HTTP Request-3"], "isController": false}, {"data": [0.75, 500, 1500, "HTTP Request-2"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-5"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-4"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-1"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "HTTP Request-0"], "isController": false}, {"data": [0.25, 500, 1500, "https://www.banglapuzzle.com/career-3"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/career-2"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "https://www.banglapuzzle.com/career-1"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "https://www.banglapuzzle.com/career-0"], "isController": false}, {"data": [0.25, 500, 1500, "https://www.banglapuzzle.com/career-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/career-6"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-5"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/career-4"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-9"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.banglapuzzle.com/career-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-40"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-41"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-16"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-17"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-18"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-12"], "isController": false}, {"data": [0.5, 500, 1500, "HTTP Request-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-13"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/about-14"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-9"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about-15"], "isController": false}, {"data": [1.0, 500, 1500, "HTTP Request-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-27"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about-28"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-29"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-4"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-5"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-3"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-20"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-21"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-22"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-23"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-9"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/about-24"], "isController": false}, {"data": [0.0, 500, 1500, "HTTP Request"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-25"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/about-26"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 145, 0, 0.0, 938.6965517241376, 65, 10464, 584.0, 1906.0, 2552.8999999999987, 9058.699999999975, 1.2651159544209258, 337.20142309185616, 2.192984100437119], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.banglapuzzle.com/career-16", 2, 0, 0.0, 266.5, 234, 299, 266.5, 299.0, 299.0, 299.0, 0.01857320629260229, 0.07943491890473803, 0.020060513827752084], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-20", 1, 0, 0.0, 1059.0, 1059, 1059, 1059.0, 1059.0, 1059.0, 1059.0, 0.9442870632672333, 0.2333052998111426, 1.0512570821529745], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-15", 2, 0, 0.0, 509.5, 235, 784, 509.5, 784.0, 784.0, 784.0, 0.018585806019942572, 0.4242881781495972, 0.020237474328355435], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-21", 1, 0, 0.0, 1049.0, 1049, 1049, 1049.0, 1049.0, 1049.0, 1049.0, 0.9532888465204957, 0.23552937321258344, 1.0529000834127742], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-22", 1, 0, 0.0, 1215.0, 1215, 1215, 1215.0, 1215.0, 1215.0, 1215.0, 0.823045267489712, 0.18084490740740738, 0.3351658950617284], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-17", 2, 0, 0.0, 725.5, 345, 1106, 725.5, 1106.0, 1106.0, 1106.0, 0.01858183439869184, 0.8346673299994425, 0.007067992674111788], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-10", 2, 0, 0.0, 384.0, 234, 534, 384.0, 534.0, 534.0, 534.0, 0.0184945441094877, 0.1418517084335121, 0.019903308211577583], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-12", 2, 0, 0.0, 278.0, 244, 312, 278.0, 312.0, 312.0, 312.0, 0.0185361965578283, 0.05818808968275299, 0.020074845686163655], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-11", 2, 0, 0.0, 274.5, 233, 316, 274.5, 316.0, 316.0, 316.0, 0.018546338025556854, 0.03088943310799533, 0.02010394063317198], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-14", 2, 0, 0.0, 911.0, 239, 1583, 911.0, 1583.0, 1583.0, 1583.0, 0.01857510378839242, 0.5668671810422491, 0.02017140177020739], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-13", 2, 0, 0.0, 722.0, 247, 1197, 722.0, 1197.0, 1197.0, 1197.0, 0.01855459690138232, 0.8327100148436775, 0.02009477340198534], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-17", 1, 0, 0.0, 315.0, 315, 315, 315.0, 315.0, 315.0, 315.0, 3.1746031746031744, 0.7843501984126984, 3.515625], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-18", 1, 0, 0.0, 468.0, 468, 468, 468.0, 468.0, 468.0, 468.0, 2.136752136752137, 0.5279280181623931, 2.3662860576923075], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-19", 1, 0, 0.0, 1075.0, 1075, 1075, 1075.0, 1075.0, 1075.0, 1075.0, 0.930232558139535, 0.2298328488372093, 1.0328851744186047], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-13", 1, 0, 0.0, 548.0, 548, 548, 548.0, 548.0, 548.0, 548.0, 1.8248175182481752, 28.56623517335766, 1.9673813868613137], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-14", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 44.09910187007874, 4.217673474409449], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-15", 1, 0, 0.0, 584.0, 584, 584, 584.0, 584.0, 584.0, 584.0, 1.7123287671232876, 30.651353809931507, 1.8644986087328768], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-16", 1, 0, 0.0, 1502.0, 1502, 1502, 1502.0, 1502.0, 1502.0, 1502.0, 0.6657789613848203, 11.701845456058589, 0.7145420689081226], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-10", 1, 0, 0.0, 244.0, 244, 244, 244.0, 244.0, 244.0, 244.0, 4.0983606557377055, 1.0125832479508197, 4.510598104508197], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-11", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 1.0469081038135595, 4.696603548728814], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-12", 1, 0, 0.0, 4966.0, 4966, 4966, 4966.0, 4966.0, 4966.0, 4966.0, 0.2013693113169553, 366.8681408578332, 0.21592139045509465], "isController": false}, {"data": ["HTTP Request-16", 1, 0, 0.0, 234.0, 234, 234, 234.0, 234.0, 234.0, 234.0, 4.273504273504274, 25.774572649572647, 4.206730769230769], "isController": false}, {"data": ["HTTP Request-15", 1, 0, 0.0, 800.0, 800, 800, 800.0, 800.0, 800.0, 800.0, 1.25, 221.97021484375, 1.104736328125], "isController": false}, {"data": ["HTTP Request-14", 1, 0, 0.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 243.0, 4.11522633744856, 46.1033950617284, 4.0227944958847734], "isController": false}, {"data": ["HTTP Request-13", 1, 0, 0.0, 244.0, 244, 244, 244.0, 244.0, 244.0, 244.0, 4.0983606557377055, 44.75377817622951, 4.050332991803279], "isController": false}, {"data": ["HTTP Request-19", 1, 0, 0.0, 693.0, 693, 693, 693.0, 693.0, 693.0, 693.0, 1.443001443001443, 65.526920995671, 1.4289096320346322], "isController": false}, {"data": ["HTTP Request-18", 1, 0, 0.0, 706.0, 706, 706, 706.0, 706.0, 706.0, 706.0, 1.41643059490085, 86.10210472733712, 1.3984485658640227], "isController": false}, {"data": ["HTTP Request-17", 1, 0, 0.0, 953.0, 953, 953, 953.0, 953.0, 953.0, 953.0, 1.0493179433368311, 93.92522789874083, 1.0329223504721932], "isController": false}, {"data": ["HTTP Request-12", 1, 0, 0.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 243.0, 4.11522633744856, 46.1033950617284, 4.0227944958847734], "isController": false}, {"data": ["HTTP Request-11", 1, 0, 0.0, 238.0, 238, 238, 238.0, 238.0, 238.0, 238.0, 4.201680672268908, 12.957917542016807, 4.140132615546219], "isController": false}, {"data": ["HTTP Request-10", 1, 0, 0.0, 473.0, 473, 473, 473.0, 473.0, 473.0, 473.0, 2.1141649048625792, 31.908611918604652, 2.0666787790697674], "isController": false}, {"data": ["https://www.banglapuzzle.com/career", 2, 0, 0.0, 3989.5, 2314, 5665, 3989.5, 5665.0, 5665.0, 5665.0, 0.01785220162276513, 11.971478946117593, 0.3054487290348207], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-1", 3, 0, 0.0, 622.6666666666667, 189, 1318, 361.0, 1318.0, 1318.0, 1318.0, 0.8658008658008658, 99.153363997114, 0.5554991883116883], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-2", 3, 0, 0.0, 1314.6666666666667, 595, 1898, 1451.0, 1898.0, 1898.0, 1898.0, 1.0944910616563297, 179.17160707770887, 0.9530480435972273], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-0", 3, 0, 0.0, 871.0, 545, 1345, 723.0, 1345.0, 1345.0, 1345.0, 0.8566533409480297, 57.27251838235294, 0.7010502926898915], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-5", 1, 0, 0.0, 871.0, 871, 871, 871.0, 871.0, 871.0, 871.0, 1.1481056257175661, 1.527070177956372, 1.249013346727899], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-6", 1, 0, 0.0, 651.0, 651, 651, 651.0, 651.0, 651.0, 651.0, 1.5360983102918586, 23.312992031490015, 0.7440476190476191], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-3", 2, 0, 0.0, 1750.5, 1581, 1920, 1750.5, 1920.0, 1920.0, 1920.0, 0.49152125829442117, 503.64944934259034, 0.37368095662324896], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-4", 2, 0, 0.0, 980.5, 278, 1683, 980.5, 1683.0, 1683.0, 1683.0, 0.8244023083264633, 5.6750115931574605, 0.6299753967436108], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-9", 1, 0, 0.0, 417.0, 417, 417, 417.0, 417.0, 417.0, 417.0, 2.398081534772182, 28.458483213429258, 0.9273830935251799], "isController": false}, {"data": ["HTTP Request-22", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 106.0, 9.433962264150942, 13.699513561320755, 2.44140625], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-7", 1, 0, 0.0, 2178.0, 2178, 2178, 2178.0, 2178.0, 2178.0, 2178.0, 0.4591368227731864, 51.652444186179984, 1.1881958792470158], "isController": false}, {"data": ["HTTP Request-21", 1, 0, 0.0, 95.0, 95, 95, 95.0, 95.0, 95.0, 95.0, 10.526315789473683, 2.312911184210526, 3.330592105263158], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-8", 1, 0, 0.0, 604.0, 604, 604, 604.0, 604.0, 604.0, 604.0, 1.6556291390728477, 327.8048685844371, 0.6046926738410596], "isController": false}, {"data": ["HTTP Request-20", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 35.049116561181435, 4.1411194620253164], "isController": false}, {"data": ["https://www.banglapuzzle.com/products", 1, 0, 0.0, 7409.0, 7409, 7409, 7409.0, 7409.0, 7409.0, 7409.0, 0.13497098123903362, 288.3568021156701, 3.0381651538669185], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-38", 1, 0, 0.0, 562.0, 562, 562, 562.0, 562.0, 562.0, 562.0, 1.779359430604982, 108.16385398131672, 1.9183718861209962], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-39", 1, 0, 0.0, 311.0, 311, 311, 311.0, 311.0, 311.0, 311.0, 3.215434083601286, 146.01336414790998, 3.4760600884244375], "isController": false}, {"data": ["Test", 1, 0, 0.0, 28434.0, 28434, 28434, 28434.0, 28434.0, 28434.0, 28434.0, 0.03516916367728776, 620.174543460294, 4.23651042765703], "isController": true}, {"data": ["https://www.banglapuzzle.com/about-30", 1, 0, 0.0, 864.0, 864, 864, 864.0, 864.0, 864.0, 864.0, 1.1574074074074074, 52.072030526620374, 1.232005931712963], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-31", 1, 0, 0.0, 5022.0, 5022, 5022, 5022.0, 5022.0, 5022.0, 5022.0, 0.19912385503783353, 265.23141925527676, 0.21468040621266427], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-32", 1, 0, 0.0, 527.0, 527, 527, 527.0, 527.0, 527.0, 527.0, 1.8975332068311195, 308.70493358633775, 2.0179820920303606], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-33", 1, 0, 0.0, 304.0, 304, 304, 304.0, 304.0, 304.0, 304.0, 3.289473684210526, 392.7226819490132, 3.47900390625], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-34", 1, 0, 0.0, 468.0, 468, 468, 468.0, 468.0, 468.0, 468.0, 2.136752136752137, 87.780031383547, 2.266125801282051], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-35", 1, 0, 0.0, 498.0, 498, 498, 498.0, 498.0, 498.0, 498.0, 2.008032128514056, 422.7221385542169, 2.160987700803213], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-36", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 251.0, 3.9840637450199203, 24.028884462151396, 4.283646663346613], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-37", 1, 0, 0.0, 265.0, 265, 265, 265.0, 265.0, 265.0, 265.0, 3.7735849056603774, 337.77638561320754, 4.0573408018867925], "isController": false}, {"data": ["HTTP Request-3", 1, 0, 0.0, 712.0, 712, 712, 712.0, 712.0, 712.0, 712.0, 1.4044943820224718, 42.99892468398877, 1.3935217696629214], "isController": false}, {"data": ["HTTP Request-2", 2, 0, 0.0, 812.5, 238, 1387, 812.5, 1387.0, 1387.0, 1387.0, 1.4419610670511895, 110.15301122025956, 1.4518182227829848], "isController": false}, {"data": ["HTTP Request-5", 1, 0, 0.0, 238.0, 238, 238, 238.0, 238.0, 238.0, 238.0, 4.201680672268908, 5.588563550420169, 4.18937106092437], "isController": false}, {"data": ["HTTP Request-4", 1, 0, 0.0, 246.0, 246, 246, 246.0, 246.0, 246.0, 246.0, 4.065040650406504, 14.688135162601625, 4.033282520325203], "isController": false}, {"data": ["HTTP Request-1", 3, 0, 0.0, 238.0, 115, 353, 246.0, 353.0, 353.0, 353.0, 1.969796454366382, 115.27541242613265, 1.1105753447143796], "isController": false}, {"data": ["HTTP Request-0", 3, 0, 0.0, 718.0, 446, 935, 773.0, 935.0, 935.0, 935.0, 1.5368852459016393, 61.488917616547134, 1.2497198386270492], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-3", 2, 0, 0.0, 1134.0, 739, 1529, 1134.0, 1529.0, 1529.0, 1529.0, 0.01831317358141579, 0.28259337143236485, 0.019976381728946717], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-2", 3, 0, 0.0, 989.6666666666666, 318, 1918, 733.0, 1918.0, 1918.0, 1918.0, 0.02747152118970001, 1.6794024114272372, 0.02968927420241017], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-1", 3, 0, 0.0, 585.0, 240, 979, 536.0, 979.0, 979.0, 979.0, 0.027595849584222534, 1.4250759029591948, 0.023346879254360145], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-0", 3, 0, 0.0, 1404.3333333333333, 939, 2223, 1051.0, 2223.0, 2223.0, 2223.0, 0.027083634262602917, 1.1633619930846453, 0.02197018768958544], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-7", 2, 0, 0.0, 1164.0, 740, 1588, 1164.0, 1588.0, 1588.0, 1588.0, 0.018368677730733553, 2.4341457789926615, 0.03312281584941358], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-6", 2, 0, 0.0, 238.5, 98, 379, 238.5, 379.0, 379.0, 379.0, 0.018421295017039697, 0.27957553306622457, 0.008473076126001658], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-5", 2, 0, 0.0, 506.5, 249, 764, 506.5, 764.0, 764.0, 764.0, 0.018308982386758946, 0.014437991481745944, 0.020061209216741732], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-4", 2, 0, 0.0, 858.5, 731, 986, 858.5, 986.0, 986.0, 986.0, 0.018314515168997188, 0.03535023362453412, 0.019977845159931503], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-9", 2, 0, 0.0, 431.5, 65, 798, 431.5, 798.0, 798.0, 798.0, 0.01852967063510446, 0.8460133703154676, 0.0071657710659193035], "isController": false}, {"data": ["https://www.banglapuzzle.com/career-8", 2, 0, 0.0, 684.0, 138, 1230, 684.0, 1230.0, 1230.0, 1230.0, 0.018446781036709096, 3.6523545586607638, 0.006737398542704298], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-40", 1, 0, 0.0, 308.0, 308, 308, 308.0, 308.0, 308.0, 308.0, 3.246753246753247, 26.96961241883117, 3.4813818993506493], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-41", 1, 0, 0.0, 371.0, 371, 371, 371.0, 371.0, 371.0, 371.0, 2.6954177897574128, 0.5922548854447439, 1.0976457210242587], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-16", 1, 0, 0.0, 247.0, 247, 247, 247.0, 247.0, 247.0, 247.0, 4.048582995951417, 48.642301366396765, 4.451859817813765], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-17", 1, 0, 0.0, 1211.0, 1211, 1211, 1211.0, 1211.0, 1211.0, 1211.0, 0.8257638315441783, 73.68732581544178, 0.9072112407101568], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-18", 1, 0, 0.0, 1007.0, 1007, 1007, 1007.0, 1007.0, 1007.0, 1007.0, 0.9930486593843098, 129.4464141633565, 1.0667514895729893], "isController": false}, {"data": ["https://www.banglapuzzle.com/about", 1, 0, 0.0, 10464.0, 10464, 10464, 10464.0, 10464.0, 10464.0, 10464.0, 0.095565749235474, 1261.0293513773413, 4.129205639573777], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-19", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 204.70903051181102, 4.229207677165355], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-10", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 251.0, 3.9840637450199203, 45.91789093625498, 1.5290400896414342], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-11", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 139.48127815315314, 4.15259009009009], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-12", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 8.69140625, 5.13916015625], "isController": false}, {"data": ["HTTP Request-7", 1, 0, 0.0, 1177.0, 1177, 1177, 1177.0, 1177.0, 1177.0, 1177.0, 0.8496176720475787, 69.77153249787595, 1.994610237892948], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-13", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 54.48654670577617, 3.8568930505415158], "isController": false}, {"data": ["HTTP Request-6", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 93.0, 10.752688172043012, 163.1909442204301, 4.231770833333333], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-14", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 12.04681396484375, 4.20379638671875], "isController": false}, {"data": ["HTTP Request-9", 1, 0, 0.0, 252.0, 252, 252, 252.0, 252.0, 252.0, 252.0, 3.968253968253968, 2.7591765873015874, 1.2710813492063493], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-15", 1, 0, 0.0, 2485.0, 2485, 2485, 2485.0, 2485.0, 2485.0, 2485.0, 0.40241448692152915, 1103.7973937374245, 0.8464851609657948], "isController": false}, {"data": ["HTTP Request-8", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 1622.9027920081967, 2.249295594262295], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-27", 1, 0, 0.0, 1146.0, 1146, 1146, 1146.0, 1146.0, 1146.0, 1146.0, 0.8726003490401396, 525.1528754908377, 0.9279900196335079], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-28", 1, 0, 0.0, 3720.0, 3720, 3720, 3720.0, 3720.0, 3720.0, 3720.0, 0.26881720430107525, 1348.5062794018816, 0.28981854838709675], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-29", 1, 0, 0.0, 754.0, 754, 754, 754.0, 754.0, 754.0, 754.0, 1.3262599469496021, 166.6722790948276, 1.4246933023872679], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-4", 1, 0, 0.0, 786.0, 786, 786, 786.0, 786.0, 786.0, 786.0, 1.272264631043257, 0.3143388199745547, 1.4188732506361323], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-5", 1, 0, 0.0, 798.0, 798, 798, 798.0, 798.0, 798.0, 798.0, 1.2531328320802004, 0.30961192042606517, 1.403655623433584], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-2", 1, 0, 0.0, 795.0, 795, 795, 795.0, 795.0, 795.0, 795.0, 1.2578616352201257, 0.3107802672955975, 1.3991253930817609], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-3", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 1.0424907700421941, 4.705630274261604], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-0", 1, 0, 0.0, 1622.0, 1622, 1622, 1622.0, 1622.0, 1622.0, 1622.0, 0.6165228113440198, 21.540367794389642, 0.6381974414303329], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-1", 1, 0, 0.0, 792.0, 792, 792, 792.0, 792.0, 792.0, 792.0, 1.2626262626262628, 0.3119574652777778, 1.3933278093434343], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-20", 1, 0, 0.0, 1075.0, 1075, 1075, 1075.0, 1075.0, 1075.0, 1075.0, 0.930232558139535, 105.05904796511628, 1.0310683139534884], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-21", 1, 0, 0.0, 572.0, 572, 572, 572.0, 572.0, 572.0, 572.0, 1.7482517482517483, 206.52077414772728, 1.9377595061188813], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-22", 1, 0, 0.0, 1471.0, 1471, 1471, 1471.0, 1471.0, 1471.0, 1471.0, 0.6798096532970768, 130.98949481645138, 0.7534999575118966], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-8", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 211.0, 4.739336492890995, 938.3608560426541, 1.7309686018957346], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-23", 1, 0, 0.0, 1030.0, 1030, 1030, 1030.0, 1030.0, 1030.0, 1030.0, 0.970873786407767, 353.955552184466, 1.0761149878640777], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-9", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 10.225183823529411, 6.046070772058823], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-24", 1, 0, 0.0, 2163.0, 2163, 2163, 2163.0, 2163.0, 2163.0, 2163.0, 0.4623208506703652, 279.0575878409617, 0.49618224110032366], "isController": false}, {"data": ["HTTP Request", 1, 0, 0.0, 2582.0, 2582, 2582, 2582.0, 2582.0, 2582.0, 2582.0, 0.3872966692486445, 372.1996635360186, 7.948658985282727], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-6", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 150.26492883663366, 4.795792079207921], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-25", 1, 0, 0.0, 1039.0, 1039, 1039, 1039.0, 1039.0, 1039.0, 1039.0, 0.9624639076034649, 168.76015098652553, 1.066793491337825], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-7", 1, 0, 0.0, 757.0, 757, 757, 757.0, 757.0, 757.0, 757.0, 1.321003963011889, 0.32638086195508587, 1.4590385568031703], "isController": false}, {"data": ["https://www.banglapuzzle.com/about-26", 1, 0, 0.0, 776.0, 776, 776, 776.0, 776.0, 776.0, 776.0, 1.288659793814433, 140.55578487435565, 1.3855609697164948], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 145, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
