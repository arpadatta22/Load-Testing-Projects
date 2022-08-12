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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2.0, "series": [{"data": [[200.0, 2.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17", "isController": false}, {"data": [[200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11", "isController": false}, {"data": [[1500.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-16", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "HTTP Request-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-13", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "HTTP Request-19", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "HTTP Request-18", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "HTTP Request-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-11", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "HTTP Request-10", "isController": false}, {"data": [[2300.0, 1.0], [5600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1", "isController": false}, {"data": [[1400.0, 1.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2", "isController": false}, {"data": [[1300.0, 1.0], [700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6", "isController": false}, {"data": [[1500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3", "isController": false}, {"data": [[1600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "HTTP Request-22", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "HTTP Request-21", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-20", "isController": false}, {"data": [[7400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39", "isController": false}, {"data": [[28400.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30", "isController": false}, {"data": [[5000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "HTTP Request-3", "isController": false}, {"data": [[1300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "HTTP Request-2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-4", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "HTTP Request-1", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "HTTP Request-0", "isController": false}, {"data": [[700.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2", "isController": false}, {"data": [[200.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1", "isController": false}, {"data": [[2200.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0", "isController": false}, {"data": [[700.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4", "isController": false}, {"data": [[0.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18", "isController": false}, {"data": [[10400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "HTTP Request-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "HTTP Request-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "HTTP Request-9", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "HTTP Request-8", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 28400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 22.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 65.0, "series": [{"data": [[0.0, 65.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 58.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 22.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66024944E12, "maxY": 1.0, "series": [{"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-9", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.66024944E12, 1.0], [1.6602495E12, 1.0], [1.66024956E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66024956E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 68.0, "minX": 0.0, "maxY": 28434.0, "series": [{"data": [[1.0, 266.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16", "isController": false}, {"data": [[1.0, 266.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16-Aggregated", "isController": false}, {"data": [[1.0, 1059.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.0, 1059.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20-Aggregated", "isController": false}, {"data": [[1.0, 509.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15", "isController": false}, {"data": [[1.0, 509.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15-Aggregated", "isController": false}, {"data": [[1.0, 1049.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.0, 1049.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21-Aggregated", "isController": false}, {"data": [[1.0, 1215.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.0, 1215.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22-Aggregated", "isController": false}, {"data": [[1.0, 725.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17", "isController": false}, {"data": [[1.0, 725.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17-Aggregated", "isController": false}, {"data": [[1.0, 384.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10", "isController": false}, {"data": [[1.0, 384.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12-Aggregated", "isController": false}, {"data": [[1.0, 274.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11", "isController": false}, {"data": [[1.0, 274.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11-Aggregated", "isController": false}, {"data": [[1.0, 911.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14", "isController": false}, {"data": [[1.0, 911.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14-Aggregated", "isController": false}, {"data": [[1.0, 722.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13", "isController": false}, {"data": [[1.0, 722.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13-Aggregated", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.0, 315.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17-Aggregated", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18-Aggregated", "isController": false}, {"data": [[1.0, 1075.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.0, 1075.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19-Aggregated", "isController": false}, {"data": [[1.0, 548.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.0, 548.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13-Aggregated", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14-Aggregated", "isController": false}, {"data": [[1.0, 584.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.0, 584.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15-Aggregated", "isController": false}, {"data": [[1.0, 1502.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.0, 1502.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16-Aggregated", "isController": false}, {"data": [[1.0, 244.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.0, 244.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10-Aggregated", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11-Aggregated", "isController": false}, {"data": [[1.0, 4966.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.0, 4966.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12-Aggregated", "isController": false}, {"data": [[1.0, 234.0]], "isOverall": false, "label": "HTTP Request-16", "isController": false}, {"data": [[1.0, 234.0]], "isOverall": false, "label": "HTTP Request-16-Aggregated", "isController": false}, {"data": [[1.0, 800.0]], "isOverall": false, "label": "HTTP Request-15", "isController": false}, {"data": [[1.0, 800.0]], "isOverall": false, "label": "HTTP Request-15-Aggregated", "isController": false}, {"data": [[1.0, 243.0]], "isOverall": false, "label": "HTTP Request-14", "isController": false}, {"data": [[1.0, 243.0]], "isOverall": false, "label": "HTTP Request-14-Aggregated", "isController": false}, {"data": [[1.0, 244.0]], "isOverall": false, "label": "HTTP Request-13", "isController": false}, {"data": [[1.0, 244.0]], "isOverall": false, "label": "HTTP Request-13-Aggregated", "isController": false}, {"data": [[1.0, 693.0]], "isOverall": false, "label": "HTTP Request-19", "isController": false}, {"data": [[1.0, 693.0]], "isOverall": false, "label": "HTTP Request-19-Aggregated", "isController": false}, {"data": [[1.0, 706.0]], "isOverall": false, "label": "HTTP Request-18", "isController": false}, {"data": [[1.0, 706.0]], "isOverall": false, "label": "HTTP Request-18-Aggregated", "isController": false}, {"data": [[1.0, 953.0]], "isOverall": false, "label": "HTTP Request-17", "isController": false}, {"data": [[1.0, 953.0]], "isOverall": false, "label": "HTTP Request-17-Aggregated", "isController": false}, {"data": [[1.0, 243.0]], "isOverall": false, "label": "HTTP Request-12", "isController": false}, {"data": [[1.0, 243.0]], "isOverall": false, "label": "HTTP Request-12-Aggregated", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "HTTP Request-11", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "HTTP Request-11-Aggregated", "isController": false}, {"data": [[1.0, 473.0]], "isOverall": false, "label": "HTTP Request-10", "isController": false}, {"data": [[1.0, 473.0]], "isOverall": false, "label": "HTTP Request-10-Aggregated", "isController": false}, {"data": [[1.0, 3989.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career", "isController": false}, {"data": [[1.0, 3989.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-Aggregated", "isController": false}, {"data": [[1.0, 361.0], [0.0, 753.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1", "isController": false}, {"data": [[0.33333333333333337, 622.6666666666667]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1-Aggregated", "isController": false}, {"data": [[1.0, 1898.0], [0.0, 1023.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2", "isController": false}, {"data": [[0.33333333333333337, 1314.6666666666667]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2-Aggregated", "isController": false}, {"data": [[1.0, 1345.0], [0.0, 634.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0", "isController": false}, {"data": [[0.33333333333333337, 871.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0-Aggregated", "isController": false}, {"data": [[1.0, 871.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5", "isController": false}, {"data": [[1.0, 871.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5-Aggregated", "isController": false}, {"data": [[1.0, 651.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6", "isController": false}, {"data": [[1.0, 651.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6-Aggregated", "isController": false}, {"data": [[1.0, 1581.0], [0.0, 1920.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3", "isController": false}, {"data": [[0.5, 1750.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3-Aggregated", "isController": false}, {"data": [[1.0, 1683.0], [0.0, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4", "isController": false}, {"data": [[0.5, 980.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4-Aggregated", "isController": false}, {"data": [[1.0, 417.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9", "isController": false}, {"data": [[1.0, 417.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9-Aggregated", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "HTTP Request-22", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "HTTP Request-22-Aggregated", "isController": false}, {"data": [[1.0, 2178.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7", "isController": false}, {"data": [[1.0, 2178.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7-Aggregated", "isController": false}, {"data": [[1.0, 95.0]], "isOverall": false, "label": "HTTP Request-21", "isController": false}, {"data": [[1.0, 95.0]], "isOverall": false, "label": "HTTP Request-21-Aggregated", "isController": false}, {"data": [[1.0, 604.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8", "isController": false}, {"data": [[1.0, 604.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8-Aggregated", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "HTTP Request-20", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "HTTP Request-20-Aggregated", "isController": false}, {"data": [[1.0, 7409.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.0, 7409.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-Aggregated", "isController": false}, {"data": [[1.0, 562.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38", "isController": false}, {"data": [[1.0, 562.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38-Aggregated", "isController": false}, {"data": [[1.0, 311.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39", "isController": false}, {"data": [[1.0, 311.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39-Aggregated", "isController": false}, {"data": [[1.0, 28434.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 28434.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 864.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30", "isController": false}, {"data": [[1.0, 864.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30-Aggregated", "isController": false}, {"data": [[1.0, 5022.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31", "isController": false}, {"data": [[1.0, 5022.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31-Aggregated", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32", "isController": false}, {"data": [[1.0, 527.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32-Aggregated", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33-Aggregated", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34", "isController": false}, {"data": [[1.0, 468.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34-Aggregated", "isController": false}, {"data": [[1.0, 498.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35", "isController": false}, {"data": [[1.0, 498.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35-Aggregated", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36-Aggregated", "isController": false}, {"data": [[1.0, 265.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37", "isController": false}, {"data": [[1.0, 265.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37-Aggregated", "isController": false}, {"data": [[1.0, 712.0]], "isOverall": false, "label": "HTTP Request-3", "isController": false}, {"data": [[1.0, 712.0]], "isOverall": false, "label": "HTTP Request-3-Aggregated", "isController": false}, {"data": [[1.0, 1387.0], [0.0, 238.0]], "isOverall": false, "label": "HTTP Request-2", "isController": false}, {"data": [[0.5, 812.5]], "isOverall": false, "label": "HTTP Request-2-Aggregated", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "HTTP Request-5", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "HTTP Request-5-Aggregated", "isController": false}, {"data": [[1.0, 246.0]], "isOverall": false, "label": "HTTP Request-4", "isController": false}, {"data": [[1.0, 246.0]], "isOverall": false, "label": "HTTP Request-4-Aggregated", "isController": false}, {"data": [[1.0, 246.0], [0.0, 234.0]], "isOverall": false, "label": "HTTP Request-1", "isController": false}, {"data": [[0.33333333333333337, 238.0]], "isOverall": false, "label": "HTTP Request-1-Aggregated", "isController": false}, {"data": [[1.0, 773.0], [0.0, 690.5]], "isOverall": false, "label": "HTTP Request-0", "isController": false}, {"data": [[0.33333333333333337, 718.0]], "isOverall": false, "label": "HTTP Request-0-Aggregated", "isController": false}, {"data": [[1.0, 1134.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3", "isController": false}, {"data": [[1.0, 1134.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3-Aggregated", "isController": false}, {"data": [[1.0, 1325.5], [0.0, 318.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2", "isController": false}, {"data": [[0.6666666666666666, 989.6666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2-Aggregated", "isController": false}, {"data": [[1.0, 609.5], [0.0, 536.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1", "isController": false}, {"data": [[0.6666666666666666, 585.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1-Aggregated", "isController": false}, {"data": [[1.0, 1637.0], [0.0, 939.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0", "isController": false}, {"data": [[0.6666666666666666, 1404.3333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0-Aggregated", "isController": false}, {"data": [[1.0, 1164.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7", "isController": false}, {"data": [[1.0, 1164.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7-Aggregated", "isController": false}, {"data": [[1.0, 238.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6", "isController": false}, {"data": [[1.0, 238.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6-Aggregated", "isController": false}, {"data": [[1.0, 506.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5", "isController": false}, {"data": [[1.0, 506.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5-Aggregated", "isController": false}, {"data": [[1.0, 858.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4", "isController": false}, {"data": [[1.0, 858.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4-Aggregated", "isController": false}, {"data": [[1.0, 431.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9", "isController": false}, {"data": [[1.0, 431.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9-Aggregated", "isController": false}, {"data": [[1.0, 684.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8", "isController": false}, {"data": [[1.0, 684.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8-Aggregated", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40-Aggregated", "isController": false}, {"data": [[1.0, 371.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41", "isController": false}, {"data": [[1.0, 371.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41-Aggregated", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16-Aggregated", "isController": false}, {"data": [[1.0, 1211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17", "isController": false}, {"data": [[1.0, 1211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17-Aggregated", "isController": false}, {"data": [[1.0, 1007.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18", "isController": false}, {"data": [[1.0, 1007.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18-Aggregated", "isController": false}, {"data": [[1.0, 10464.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about", "isController": false}, {"data": [[1.0, 10464.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-Aggregated", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19-Aggregated", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12-Aggregated", "isController": false}, {"data": [[1.0, 1177.0]], "isOverall": false, "label": "HTTP Request-7", "isController": false}, {"data": [[1.0, 1177.0]], "isOverall": false, "label": "HTTP Request-7-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13-Aggregated", "isController": false}, {"data": [[1.0, 93.0]], "isOverall": false, "label": "HTTP Request-6", "isController": false}, {"data": [[1.0, 93.0]], "isOverall": false, "label": "HTTP Request-6-Aggregated", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14-Aggregated", "isController": false}, {"data": [[1.0, 252.0]], "isOverall": false, "label": "HTTP Request-9", "isController": false}, {"data": [[1.0, 252.0]], "isOverall": false, "label": "HTTP Request-9-Aggregated", "isController": false}, {"data": [[1.0, 2485.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15", "isController": false}, {"data": [[1.0, 2485.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15-Aggregated", "isController": false}, {"data": [[1.0, 122.0]], "isOverall": false, "label": "HTTP Request-8", "isController": false}, {"data": [[1.0, 122.0]], "isOverall": false, "label": "HTTP Request-8-Aggregated", "isController": false}, {"data": [[1.0, 1146.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27", "isController": false}, {"data": [[1.0, 1146.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27-Aggregated", "isController": false}, {"data": [[1.0, 3720.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28", "isController": false}, {"data": [[1.0, 3720.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28-Aggregated", "isController": false}, {"data": [[1.0, 754.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29", "isController": false}, {"data": [[1.0, 754.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29-Aggregated", "isController": false}, {"data": [[1.0, 786.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.0, 786.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4-Aggregated", "isController": false}, {"data": [[1.0, 798.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.0, 798.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5-Aggregated", "isController": false}, {"data": [[1.0, 795.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.0, 795.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2-Aggregated", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3-Aggregated", "isController": false}, {"data": [[1.0, 1622.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.0, 1622.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0-Aggregated", "isController": false}, {"data": [[1.0, 792.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.0, 792.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1-Aggregated", "isController": false}, {"data": [[1.0, 1075.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20", "isController": false}, {"data": [[1.0, 1075.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20-Aggregated", "isController": false}, {"data": [[1.0, 572.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21", "isController": false}, {"data": [[1.0, 572.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21-Aggregated", "isController": false}, {"data": [[1.0, 1471.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22", "isController": false}, {"data": [[1.0, 1471.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22-Aggregated", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8-Aggregated", "isController": false}, {"data": [[1.0, 1030.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23", "isController": false}, {"data": [[1.0, 1030.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23-Aggregated", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9-Aggregated", "isController": false}, {"data": [[1.0, 2163.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24", "isController": false}, {"data": [[1.0, 2163.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24-Aggregated", "isController": false}, {"data": [[1.0, 2582.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[1.0, 2582.0]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6-Aggregated", "isController": false}, {"data": [[1.0, 1039.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25", "isController": false}, {"data": [[1.0, 1039.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25-Aggregated", "isController": false}, {"data": [[1.0, 757.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}, {"data": [[1.0, 757.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7-Aggregated", "isController": false}, {"data": [[1.0, 776.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26", "isController": false}, {"data": [[1.0, 776.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 626.2333333333333, "minX": 1.66024944E12, "maxY": 544609.5333333333, "series": [{"data": [[1.66024944E12, 42059.4], [1.6602495E12, 72923.66666666667], [1.66024956E12, 544609.5333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66024944E12, 626.2333333333333], [1.6602495E12, 768.3333333333334], [1.66024956E12, 2895.0833333333335]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66024956E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 65.0, "minX": 1.66024944E12, "maxY": 28434.0, "series": [{"data": [[1.66024944E12, 299.0], [1.66024956E12, 234.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16", "isController": false}, {"data": [[1.6602495E12, 1059.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.66024944E12, 784.0], [1.66024956E12, 235.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15", "isController": false}, {"data": [[1.6602495E12, 1049.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.6602495E12, 1215.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.66024944E12, 1106.0], [1.66024956E12, 345.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17", "isController": false}, {"data": [[1.66024944E12, 534.0], [1.66024956E12, 234.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10", "isController": false}, {"data": [[1.66024944E12, 312.0], [1.66024956E12, 244.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12", "isController": false}, {"data": [[1.66024944E12, 316.0], [1.66024956E12, 233.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11", "isController": false}, {"data": [[1.66024944E12, 1583.0], [1.66024956E12, 239.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14", "isController": false}, {"data": [[1.66024944E12, 1197.0], [1.66024956E12, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13", "isController": false}, {"data": [[1.6602495E12, 315.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.6602495E12, 468.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.6602495E12, 1075.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.6602495E12, 548.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.6602495E12, 254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.6602495E12, 584.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.6602495E12, 1502.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.6602495E12, 244.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.6602495E12, 236.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.6602495E12, 4966.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.66024956E12, 234.0]], "isOverall": false, "label": "HTTP Request-16", "isController": false}, {"data": [[1.66024956E12, 800.0]], "isOverall": false, "label": "HTTP Request-15", "isController": false}, {"data": [[1.66024956E12, 243.0]], "isOverall": false, "label": "HTTP Request-14", "isController": false}, {"data": [[1.66024956E12, 244.0]], "isOverall": false, "label": "HTTP Request-13", "isController": false}, {"data": [[1.66024956E12, 693.0]], "isOverall": false, "label": "HTTP Request-19", "isController": false}, {"data": [[1.66024956E12, 706.0]], "isOverall": false, "label": "HTTP Request-18", "isController": false}, {"data": [[1.66024956E12, 953.0]], "isOverall": false, "label": "HTTP Request-17", "isController": false}, {"data": [[1.66024956E12, 243.0]], "isOverall": false, "label": "HTTP Request-12", "isController": false}, {"data": [[1.66024956E12, 238.0]], "isOverall": false, "label": "HTTP Request-11", "isController": false}, {"data": [[1.66024956E12, 473.0]], "isOverall": false, "label": "HTTP Request-10", "isController": false}, {"data": [[1.66024944E12, 5665.0], [1.66024956E12, 2314.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career", "isController": false}, {"data": [[1.66024956E12, 622.6666666666667]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1", "isController": false}, {"data": [[1.66024956E12, 1314.6666666666667]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2", "isController": false}, {"data": [[1.66024956E12, 871.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0", "isController": false}, {"data": [[1.66024956E12, 871.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5", "isController": false}, {"data": [[1.66024956E12, 651.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6", "isController": false}, {"data": [[1.66024956E12, 1750.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3", "isController": false}, {"data": [[1.66024956E12, 980.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4", "isController": false}, {"data": [[1.66024956E12, 417.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9", "isController": false}, {"data": [[1.66024956E12, 106.0]], "isOverall": false, "label": "HTTP Request-22", "isController": false}, {"data": [[1.66024956E12, 2178.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7", "isController": false}, {"data": [[1.66024956E12, 95.0]], "isOverall": false, "label": "HTTP Request-21", "isController": false}, {"data": [[1.66024956E12, 604.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8", "isController": false}, {"data": [[1.66024956E12, 237.0]], "isOverall": false, "label": "HTTP Request-20", "isController": false}, {"data": [[1.6602495E12, 7409.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.66024956E12, 562.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38", "isController": false}, {"data": [[1.66024956E12, 311.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39", "isController": false}, {"data": [[1.6602495E12, 28434.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66024956E12, 864.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30", "isController": false}, {"data": [[1.66024956E12, 5022.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31", "isController": false}, {"data": [[1.66024956E12, 527.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32", "isController": false}, {"data": [[1.66024956E12, 304.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33", "isController": false}, {"data": [[1.66024956E12, 468.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34", "isController": false}, {"data": [[1.66024956E12, 498.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35", "isController": false}, {"data": [[1.66024956E12, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36", "isController": false}, {"data": [[1.66024956E12, 265.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37", "isController": false}, {"data": [[1.66024956E12, 712.0]], "isOverall": false, "label": "HTTP Request-3", "isController": false}, {"data": [[1.66024956E12, 812.5]], "isOverall": false, "label": "HTTP Request-2", "isController": false}, {"data": [[1.66024956E12, 238.0]], "isOverall": false, "label": "HTTP Request-5", "isController": false}, {"data": [[1.66024956E12, 246.0]], "isOverall": false, "label": "HTTP Request-4", "isController": false}, {"data": [[1.66024956E12, 238.0]], "isOverall": false, "label": "HTTP Request-1", "isController": false}, {"data": [[1.66024956E12, 718.0]], "isOverall": false, "label": "HTTP Request-0", "isController": false}, {"data": [[1.66024944E12, 1529.0], [1.66024956E12, 739.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3", "isController": false}, {"data": [[1.66024944E12, 1118.0], [1.66024956E12, 733.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2", "isController": false}, {"data": [[1.66024944E12, 757.5], [1.66024956E12, 240.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1", "isController": false}, {"data": [[1.66024944E12, 1581.0], [1.66024956E12, 1051.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0", "isController": false}, {"data": [[1.66024944E12, 1588.0], [1.66024956E12, 740.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7", "isController": false}, {"data": [[1.66024944E12, 379.0], [1.66024956E12, 98.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6", "isController": false}, {"data": [[1.66024944E12, 249.0], [1.66024956E12, 764.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5", "isController": false}, {"data": [[1.66024944E12, 986.0], [1.66024956E12, 731.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4", "isController": false}, {"data": [[1.66024944E12, 798.0], [1.66024956E12, 65.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9", "isController": false}, {"data": [[1.66024944E12, 1230.0], [1.66024956E12, 138.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8", "isController": false}, {"data": [[1.66024956E12, 308.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40", "isController": false}, {"data": [[1.66024956E12, 371.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41", "isController": false}, {"data": [[1.66024956E12, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16", "isController": false}, {"data": [[1.66024956E12, 1211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17", "isController": false}, {"data": [[1.66024956E12, 1007.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18", "isController": false}, {"data": [[1.66024956E12, 10464.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about", "isController": false}, {"data": [[1.66024956E12, 254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19", "isController": false}, {"data": [[1.66024956E12, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10", "isController": false}, {"data": [[1.66024956E12, 111.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11", "isController": false}, {"data": [[1.66024956E12, 80.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12", "isController": false}, {"data": [[1.66024956E12, 1177.0]], "isOverall": false, "label": "HTTP Request-7", "isController": false}, {"data": [[1.66024956E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13", "isController": false}, {"data": [[1.66024956E12, 93.0]], "isOverall": false, "label": "HTTP Request-6", "isController": false}, {"data": [[1.66024956E12, 256.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14", "isController": false}, {"data": [[1.66024956E12, 252.0]], "isOverall": false, "label": "HTTP Request-9", "isController": false}, {"data": [[1.66024956E12, 2485.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15", "isController": false}, {"data": [[1.66024956E12, 122.0]], "isOverall": false, "label": "HTTP Request-8", "isController": false}, {"data": [[1.66024956E12, 1146.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27", "isController": false}, {"data": [[1.66024956E12, 3720.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28", "isController": false}, {"data": [[1.66024956E12, 754.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29", "isController": false}, {"data": [[1.6602495E12, 786.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.6602495E12, 798.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.6602495E12, 795.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.6602495E12, 237.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.6602495E12, 1622.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.6602495E12, 792.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.66024956E12, 1075.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20", "isController": false}, {"data": [[1.66024956E12, 572.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21", "isController": false}, {"data": [[1.66024956E12, 1471.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22", "isController": false}, {"data": [[1.6602495E12, 211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.66024956E12, 1030.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23", "isController": false}, {"data": [[1.6602495E12, 68.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.66024956E12, 2163.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24", "isController": false}, {"data": [[1.66024956E12, 2582.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[1.6602495E12, 101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.66024956E12, 1039.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25", "isController": false}, {"data": [[1.6602495E12, 757.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}, {"data": [[1.66024956E12, 776.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66024956E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66024944E12, "maxY": 6329.0, "series": [{"data": [[1.66024944E12, 299.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.66024944E12, 485.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.66024944E12, 741.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17", "isController": false}, {"data": [[1.66024944E12, 534.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10", "isController": false}, {"data": [[1.66024944E12, 312.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12", "isController": false}, {"data": [[1.66024944E12, 316.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11", "isController": false}, {"data": [[1.66024944E12, 1128.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14", "isController": false}, {"data": [[1.66024944E12, 521.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.6602495E12, 548.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.6602495E12, 253.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.6602495E12, 584.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.6602495E12, 1501.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.6602495E12, 530.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.66024956E12, 234.0]], "isOverall": false, "label": "HTTP Request-16", "isController": false}, {"data": [[1.66024956E12, 445.0]], "isOverall": false, "label": "HTTP Request-15", "isController": false}, {"data": [[1.66024956E12, 243.0]], "isOverall": false, "label": "HTTP Request-14", "isController": false}, {"data": [[1.66024956E12, 243.0]], "isOverall": false, "label": "HTTP Request-13", "isController": false}, {"data": [[1.66024956E12, 470.0]], "isOverall": false, "label": "HTTP Request-19", "isController": false}, {"data": [[1.66024956E12, 238.0]], "isOverall": false, "label": "HTTP Request-18", "isController": false}, {"data": [[1.66024956E12, 472.0]], "isOverall": false, "label": "HTTP Request-17", "isController": false}, {"data": [[1.66024956E12, 243.0]], "isOverall": false, "label": "HTTP Request-12", "isController": false}, {"data": [[1.66024956E12, 238.0]], "isOverall": false, "label": "HTTP Request-11", "isController": false}, {"data": [[1.66024956E12, 473.0]], "isOverall": false, "label": "HTTP Request-10", "isController": false}, {"data": [[1.66024944E12, 2215.0], [1.66024956E12, 1050.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career", "isController": false}, {"data": [[1.66024956E12, 211.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1", "isController": false}, {"data": [[1.66024956E12, 893.3333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2", "isController": false}, {"data": [[1.66024956E12, 623.3333333333334]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0", "isController": false}, {"data": [[1.66024956E12, 871.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5", "isController": false}, {"data": [[1.66024956E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6", "isController": false}, {"data": [[1.66024956E12, 825.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3", "isController": false}, {"data": [[1.66024956E12, 976.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4", "isController": false}, {"data": [[1.66024956E12, 408.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9", "isController": false}, {"data": [[1.66024956E12, 106.0]], "isOverall": false, "label": "HTTP Request-22", "isController": false}, {"data": [[1.66024956E12, 281.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-21", "isController": false}, {"data": [[1.66024956E12, 492.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8", "isController": false}, {"data": [[1.66024956E12, 237.0]], "isOverall": false, "label": "HTTP Request-20", "isController": false}, {"data": [[1.6602495E12, 1404.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.66024956E12, 297.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38", "isController": false}, {"data": [[1.66024956E12, 305.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39", "isController": false}, {"data": [[1.6602495E12, 6329.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66024956E12, 837.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30", "isController": false}, {"data": [[1.66024956E12, 2012.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31", "isController": false}, {"data": [[1.66024956E12, 242.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32", "isController": false}, {"data": [[1.66024956E12, 249.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33", "isController": false}, {"data": [[1.66024956E12, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34", "isController": false}, {"data": [[1.66024956E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35", "isController": false}, {"data": [[1.66024956E12, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36", "isController": false}, {"data": [[1.66024956E12, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37", "isController": false}, {"data": [[1.66024956E12, 476.0]], "isOverall": false, "label": "HTTP Request-3", "isController": false}, {"data": [[1.66024956E12, 236.0]], "isOverall": false, "label": "HTTP Request-2", "isController": false}, {"data": [[1.66024956E12, 238.0]], "isOverall": false, "label": "HTTP Request-5", "isController": false}, {"data": [[1.66024956E12, 245.0]], "isOverall": false, "label": "HTTP Request-4", "isController": false}, {"data": [[1.66024956E12, 168.66666666666666]], "isOverall": false, "label": "HTTP Request-1", "isController": false}, {"data": [[1.66024956E12, 487.0]], "isOverall": false, "label": "HTTP Request-0", "isController": false}, {"data": [[1.66024944E12, 1286.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3", "isController": false}, {"data": [[1.66024944E12, 799.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2", "isController": false}, {"data": [[1.66024944E12, 610.5], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1", "isController": false}, {"data": [[1.66024944E12, 1291.0], [1.66024956E12, 1050.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0", "isController": false}, {"data": [[1.66024944E12, 367.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7", "isController": false}, {"data": [[1.66024944E12, 362.0], [1.66024956E12, 83.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6", "isController": false}, {"data": [[1.66024944E12, 249.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5", "isController": false}, {"data": [[1.66024944E12, 986.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4", "isController": false}, {"data": [[1.66024944E12, 521.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9", "isController": false}, {"data": [[1.66024944E12, 461.0], [1.66024956E12, 79.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8", "isController": false}, {"data": [[1.66024956E12, 308.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41", "isController": false}, {"data": [[1.66024956E12, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16", "isController": false}, {"data": [[1.66024956E12, 511.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17", "isController": false}, {"data": [[1.66024956E12, 281.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18", "isController": false}, {"data": [[1.66024956E12, 1115.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about", "isController": false}, {"data": [[1.66024956E12, 247.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19", "isController": false}, {"data": [[1.66024956E12, 246.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10", "isController": false}, {"data": [[1.66024956E12, 103.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12", "isController": false}, {"data": [[1.66024956E12, 471.0]], "isOverall": false, "label": "HTTP Request-7", "isController": false}, {"data": [[1.66024956E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13", "isController": false}, {"data": [[1.66024956E12, 79.0]], "isOverall": false, "label": "HTTP Request-6", "isController": false}, {"data": [[1.66024956E12, 256.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-9", "isController": false}, {"data": [[1.66024956E12, 474.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15", "isController": false}, {"data": [[1.66024956E12, 73.0]], "isOverall": false, "label": "HTTP Request-8", "isController": false}, {"data": [[1.66024956E12, 310.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27", "isController": false}, {"data": [[1.66024956E12, 302.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28", "isController": false}, {"data": [[1.66024956E12, 441.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.6602495E12, 1404.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.66024956E12, 502.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20", "isController": false}, {"data": [[1.66024956E12, 243.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21", "isController": false}, {"data": [[1.66024956E12, 527.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22", "isController": false}, {"data": [[1.6602495E12, 135.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.66024956E12, 284.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.66024956E12, 301.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24", "isController": false}, {"data": [[1.66024956E12, 545.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[1.6602495E12, 90.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.66024956E12, 369.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}, {"data": [[1.66024956E12, 380.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66024956E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66024944E12, "maxY": 3298.0, "series": [{"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.6602495E12, 1124.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.66024944E12, 587.0], [1.66024956E12, 251.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11", "isController": false}, {"data": [[1.66024944E12, 605.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-16", "isController": false}, {"data": [[1.66024956E12, 214.0]], "isOverall": false, "label": "HTTP Request-15", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-14", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-13", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-19", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-18", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-17", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-12", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-11", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-10", "isController": false}, {"data": [[1.66024944E12, 1396.0], [1.66024956E12, 495.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career", "isController": false}, {"data": [[1.66024956E12, 127.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1", "isController": false}, {"data": [[1.66024956E12, 526.3333333333334]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2", "isController": false}, {"data": [[1.66024956E12, 313.3333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0", "isController": false}, {"data": [[1.66024956E12, 544.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5", "isController": false}, {"data": [[1.66024956E12, 449.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6", "isController": false}, {"data": [[1.66024956E12, 484.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3", "isController": false}, {"data": [[1.66024956E12, 488.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4", "isController": false}, {"data": [[1.66024956E12, 336.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-22", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-21", "isController": false}, {"data": [[1.66024956E12, 386.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-20", "isController": false}, {"data": [[1.6602495E12, 844.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39", "isController": false}, {"data": [[1.6602495E12, 3298.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30", "isController": false}, {"data": [[1.66024956E12, 1531.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-3", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-2", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-5", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-4", "isController": false}, {"data": [[1.66024956E12, 104.0]], "isOverall": false, "label": "HTTP Request-1", "isController": false}, {"data": [[1.66024956E12, 71.33333333333333]], "isOverall": false, "label": "HTTP Request-0", "isController": false}, {"data": [[1.66024944E12, 672.0], [1.66024956E12, 504.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3", "isController": false}, {"data": [[1.66024944E12, 329.0], [1.66024956E12, 496.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2", "isController": false}, {"data": [[1.66024944E12, 392.5], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1", "isController": false}, {"data": [[1.66024944E12, 698.0], [1.66024956E12, 495.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 506.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7", "isController": false}, {"data": [[1.66024944E12, 270.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6", "isController": false}, {"data": [[1.66024944E12, 0.0], [1.66024956E12, 508.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5", "isController": false}, {"data": [[1.66024944E12, 654.0], [1.66024956E12, 493.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4", "isController": false}, {"data": [[1.66024944E12, 253.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9", "isController": false}, {"data": [[1.66024944E12, 284.0], [1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40", "isController": false}, {"data": [[1.66024956E12, 276.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18", "isController": false}, {"data": [[1.66024956E12, 563.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19", "isController": false}, {"data": [[1.66024956E12, 122.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-7", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-6", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14", "isController": false}, {"data": [[1.66024956E12, 184.0]], "isOverall": false, "label": "HTTP Request-9", "isController": false}, {"data": [[1.66024956E12, 377.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request-8", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29", "isController": false}, {"data": [[1.6602495E12, 549.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.6602495E12, 558.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.6602495E12, 557.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.6602495E12, 844.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.6602495E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[1.6602495E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25", "isController": false}, {"data": [[1.6602495E12, 522.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}, {"data": [[1.66024956E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66024956E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 65.0, "minX": 1.66024944E12, "maxY": 10464.0, "series": [{"data": [[1.66024944E12, 5665.0], [1.6602495E12, 7409.0], [1.66024956E12, 10464.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66024944E12, 2131.5], [1.6602495E12, 3294.0], [1.66024956E12, 1898.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66024944E12, 5665.0], [1.6602495E12, 7409.0], [1.66024956E12, 10464.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66024944E12, 5148.6999999999925], [1.6602495E12, 6798.25], [1.66024956E12, 2485.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66024944E12, 249.0], [1.6602495E12, 68.0], [1.66024956E12, 65.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66024944E12, 959.0], [1.6602495E12, 771.5], [1.66024956E12, 498.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66024956E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 242.0, "minX": 1.0, "maxY": 6215.5, "series": [{"data": [[2.0, 6215.5], [8.0, 242.0], [9.0, 1007.0], [10.0, 341.0], [11.0, 798.0], [3.0, 1151.5], [13.0, 277.0], [14.0, 296.0], [1.0, 2223.0], [4.0, 809.0], [17.0, 244.0], [5.0, 1050.0], [7.0, 766.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 17.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1259.5, "series": [{"data": [[2.0, 1259.5], [8.0, 238.0], [9.0, 281.0], [10.0, 188.5], [11.0, 367.0], [3.0, 631.0], [13.0, 277.0], [14.0, 0.0], [1.0, 1115.0], [4.0, 455.5], [17.0, 243.0], [5.0, 0.0], [7.0, 278.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 17.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.66024944E12, "maxY": 1.65, "series": [{"data": [[1.66024944E12, 0.36666666666666664], [1.6602495E12, 0.4], [1.66024956E12, 1.65]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66024956E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.15, "minX": 1.66024944E12, "maxY": 1.2833333333333334, "series": [{"data": [[1.66024944E12, 0.36666666666666664], [1.6602495E12, 0.15], [1.66024956E12, 1.2833333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6602495E12, 0.25], [1.66024956E12, 0.36666666666666664]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66024956E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66024944E12, "maxY": 0.05, "series": [{"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-27-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5-success", "isController": false}, {"data": [[1.66024944E12, 0.03333333333333333], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-2-success", "isController": false}, {"data": [[1.66024956E12, 0.05]], "isOverall": false, "label": "HTTP Request-1-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-16-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-14-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-12-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-33-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-12-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-8-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-6-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-18-success", "isController": false}, {"data": [[1.66024956E12, 0.05]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-0-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-7-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-37-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-16-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-17-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-23-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-4-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-21-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14-success", "isController": false}, {"data": [[1.66024956E12, 0.05]], "isOverall": false, "label": "HTTP Request-0-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-26-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-13-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-3-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-13-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-13-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-17-success", "isController": false}, {"data": [[1.66024956E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-4-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-34-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-7-success", "isController": false}, {"data": [[1.66024956E12, 0.05]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-1-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-31-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-7-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-8-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-3-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-22-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-22-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-38-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-17-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-10-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-10-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-12-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13-success", "isController": false}, {"data": [[1.66024944E12, 0.03333333333333333], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-0-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-29-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-40-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-4-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-14-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-14-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-16-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-10-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-8-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-35-success", "isController": false}, {"data": [[1.66024956E12, 0.05]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-2-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-5-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-6-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-21-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-30-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-9-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-25-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-39-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-18-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-41-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-11-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-11-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16-success", "isController": false}, {"data": [[1.66024944E12, 0.03333333333333333], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-1-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-28-success", "isController": false}, {"data": [[1.66024956E12, 0.03333333333333333]], "isOverall": false, "label": "HTTP Request-2-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-15-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-15-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-20-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-32-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-5-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-success", "isController": false}, {"data": [[1.66024956E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-3-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-19-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-9-success", "isController": false}, {"data": [[1.66024944E12, 0.016666666666666666], [1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/career-11-success", "isController": false}, {"data": [[1.6602495E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-9-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-6-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-19-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-36-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-15-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-5-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-20-success", "isController": false}, {"data": [[1.66024956E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/about-24-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66024956E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.66024944E12, "maxY": 1.65, "series": [{"data": [[1.66024944E12, 0.36666666666666664], [1.6602495E12, 0.4166666666666667], [1.66024956E12, 1.65]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66024956E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
