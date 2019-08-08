/**
 * 控制台  超级管理员
 * Created by simless on 2019/8/7.
 */
var common = {
    // echarts 全局 配色
    color: [
        "#479fd2",
        "#fba853",
        "#48c7c0",
        "#fa8737",
        "#4bbdd6",
        "#ff6f5b",
        "#F4D5B1",
        "#ADE1E3",
        "#F4B387",
        '#5dc2fe',
        '#FF7677',
        '#64C4B8',
        '#D78B40',
        '#64C4B8',
        '#D15657',
        '#83BEED',
        '#D53A35'
    ],
    // 地图 item 样式
    mapDataItemStyle: {
        borderColor: 'white',
        borderWidth: 1,
        borderType: 'dashed',
        shadowBlur: 12,
        shadowColor: '#fff',
        shadowOffsetX: 0,
        shadowOffsetY: 2
    },
    XaxisTextStyle: {
        color: '#fff'
    },
    YaxisTextStyle: {
        color: '#fff'
    }
};
var page = {
    // 根据 id 实例化一个 echart 对象
    initChart: function(id) {
        return echarts.init(document.getElementById(id))
    },
    setMap: function() {
        var chartMap = page.initChart('map');
        // 异步加载青海省 geo 数据
        $.get('/js/qhgeoJson.json', function(geoJson) {
            echarts.registerMap('QH', geoJson); // 自定义地图
            var option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 14
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: "item",
                    triggerOn: "mousemove",
                    backgroundColor: "rgba(0,0,0,.7)",
                    borderColor: "#3574c8",
                    borderWidth: "2",
                    extraCssText: "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
                    // 自定义 tooltip
                    formatter: function(json) {
                        return json.data.name + '<br>' + '人才总数：' + json.data.value + '<br>单位总数：' + json.data.total;
                    }
                },
                toolbox: {
                    show: true,
                    z: 2,
                    right: 30,
                    feature: {
                        dataView: {
                            icon: 'image:///images/dataview.png',
                            readOnly: true,
                            textColor: '#fff',
                            buttonColor: '#D53A35',
                            buttonTextColor: '#fff',
                            backgroundColor: 'rgba(0,101,153,0.5)',
                            optionToContent: function (opt) {
                                var axisData = opt.series[0].data;
                                var series = opt.series;
                                var tdHeaders = '<td></td>'; //表头
                                series.forEach(function (item) {
                                    tdHeaders += '<td>' + item.name + '</td>'; //组装表头
                                    tdHeaders += '<td>单位总数</td>'; //组装表头
                                });
                                var table = '<div class="table-responsive"><table class="echart-table" style="text-align:center"><tbody><tr>' + tdHeaders + '</tr>';
                                var tdBodys = ''; //数据
                                for (var i = 0, l = axisData.length; i < l; i++) {
                                    for (var j = 0; j < series.length; j++) {
                                        tdBodys += '<td>' + (series[j].data[i].value == undefined ? 0: series[j].data[i].value) + '</td>'; //组装表数据
                                        tdBodys += '<td>' + (series[j].data[i].total == undefined ? 0: series[j].data[i].total) + '</td>'; //组装表数据
                                    }
                                    table += '<tr><td style="padding: 0 10px">' + axisData[i].name + '</td>' + tdBodys + '</tr>';
                                    tdBodys = '';
                                }
                                table += '</tbody></table></div>';
                                return table;
                            },
                        },
                        restore: {
                            icon: 'image:///images/restore.png'
                        },
                        saveAsImage: {
                            name: '统计图' + (+new Date()),
                            icon: 'image:///images/pic_download.png'
                        },
                        // 自定义工具名字，只能以 my 开头
                        myDownloadBtn:{
                            show:true,//是否显示
                            title:'下载excel文件', //鼠标移动上去显示的文字
                            icon:'image:///images/excel_download.png', //图标
                            option:{},
                            onclick:function(option1) {//点击事件,这里的option1是chart的option信息
                                alert('1');//这里可以加入自己的处理代码，切换不同的图形
                            }
                        },
                    }
                },
                visualMap: {
                    min: 1,
                    max: 2000,
                    text:['高','低'],
                    textStyle: {
                        color: 'white'
                    },
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: [
                            "#ffc188",
                            "#fba853",
                            "#fa8737",
                            "#D53A35"
                        ]
                    }
                },
                series: [
                    {
                        name: '人才总数',
                        type: 'map',
                        selectedMode: 'single',
                        mapType: 'QH', // 自定义扩展图表类型
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}},
                            areaColor: '#fff',
                            color: '#fff'
                        },
                        label: {
                            color: '#fff'
                        },
                        data:[
                            {name: '西宁市', value: 1233, total: 32, itemStyle: common.mapDataItemStyle},
                            {name: '海东市', value: 154, total: 21, itemStyle: common.mapDataItemStyle},
                            {name: '海西蒙古族藏族自治州', value: 316, total: 18, itemStyle: common.mapDataItemStyle},
                            {name: '海南藏族自治州', value: 69, total: 12, itemStyle: common.mapDataItemStyle},
                            {name: '海北藏族自治州', value: 64, total: 23, itemStyle: common.mapDataItemStyle},
                            {name: '果洛藏族自治州', value: 77, total: 8, itemStyle: common.mapDataItemStyle},
                            {name: '黄南藏族自治州', value: 122, total: 11, itemStyle: common.mapDataItemStyle},
                            {name: '玉树藏族自治州', value: 88, total: 13, itemStyle: common.mapDataItemStyle}
                        ]
                    }
                ]
            };
            chartMap.setOption(option);
            chartMap.on('click', function(params) {
                page.mapClick(params);

            })
        })
    },
    // 地图上的点击事件
    mapClick: function(data) {
        alert('你点击了'+ data.data.name)
    },
    // chart1 渲染
    setChart1: function() {
        var chart1 = page.initChart('chart1');
        // 指定图表的配置项和数据
        var option = {
            color: common.color,
            title: {
                text: '人才性别分布',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14
                },
                left: 'left'
            },
            tooltip: {},
            toolbox: {
                show: true,
                z: 2,
                right: 30,
                feature: {
                    dataView: {
                        icon: 'image:///images/dataview.png',
                        readOnly: true,
                        textColor: '#fff',
                        buttonColor: '#D53A35',
                        buttonTextColor: '#fff',
                        backgroundColor: 'rgba(0,101,153,0.5)',
                        optionToContent: function (opt) {
                            var axisData = opt.series[0].data;
                            var series = opt.series;
                            var tdHeaders = '<td>性别</td>'; //表头
                            series.forEach(function (item) {
                                tdHeaders += '<td>' + item.name + '</td>'; //组装表头
                            });
                            var table = '<div class="table-responsive"><table class="echart-table" style="text-align:center"><tbody><tr>' + tdHeaders + '</tr>';
                            var tdBodys = ''; //数据
                            for (var i = 0, l = axisData.length; i < l; i++) {
                                for (var j = 0; j < series.length; j++) {
                                    tdBodys += '<td>' + (series[j].data[i].value == undefined ? 0: series[j].data[i].value) + '</td>'; //组装表数据
                                }
                                table += '<tr><td style="padding: 0 10px">' + axisData[i].name + '</td>' + tdBodys + '</tr>';
                                tdBodys = '';
                            }
                            table += '</tbody></table></div>';
                            return table;
                        },
                    },
                    restore: {
                        icon: 'image:///images/restore.png'
                    },
                    saveAsImage: {
                        name: '人才结构分布' + (+new Date()),
                        icon: 'image:///images/pic_download.png'
                    },
                    // 自定义工具名字，只能以 my 开头
                    myDownloadBtn:{
                        show:true,//是否显示
                        title:'下载excel文件', //鼠标移动上去显示的文字
                        icon:'image:///images/excel_download.png', //图标
                        option:{},
                        onclick:function(option1) {//点击事件,这里的option1是chart的option信息
                            alert('1');//这里可以加入自己的处理代码，切换不同的图形
                        }
                    }
                }
            },
            legend: {
                bottom: 0,
                left: 'center',
                textStyle: {
                    color: '#5dc2fe'
                },
                data:['男', '女']
            },
            series: [{
                type: 'pie',
                name: '人数',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [{
                    value: 121,
                    name: '男'
                }, {
                    value: 22,
                    name: '女'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        chart1.setOption(option);
    },
    // chart2 渲染
    setChart2: function() {
        var chart2 = page.initChart('chart2');
        // 指定图表的配置项和数据
        var option = {
            color: common.color,
            title: {
                text: '法人单位结构',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14
                },
                left: 'left'
            },
            tooltip: {},
            toolbox: {
                show: true,
                z: 2,
                right: 30,
                feature: {
                    dataView: {
                        icon: 'image:///images/dataview.png',
                        readOnly: true,
                        textColor: '#fff',
                        buttonColor: '#D53A35',
                        buttonTextColor: '#fff',
                        backgroundColor: 'rgba(0,101,153,0.5)',
                        optionToContent: function (opt) {
                            var axisData = opt.series[0].data;
                            var series = opt.series;
                            var tdHeaders = '<td>是否法人单位</td>'; //表头
                            series.forEach(function (item) {
                                tdHeaders += '<td>' + item.name + '</td>'; //组装表头
                            });
                            var table = '<div class="table-responsive"><table class="echart-table" style="text-align:center"><tbody><tr>' + tdHeaders + '</tr>';
                            var tdBodys = ''; //数据
                            for (var i = 0, l = axisData.length; i < l; i++) {
                                for (var j = 0; j < series.length; j++) {
                                    tdBodys += '<td>' + (series[j].data[i].value == undefined ? 0: series[j].data[i].value) + '</td>'; //组装表数据
                                }
                                table += '<tr><td style="padding: 0 10px">' + axisData[i].name + '</td>' + tdBodys + '</tr>';
                                tdBodys = '';
                            }
                            table += '</tbody></table></div>';
                            return table;
                        },
                    },
                    restore: {
                        icon: 'image:///images/restore.png'
                    },
                    saveAsImage: {
                        name: '法人单位结构' + (+new Date()),
                        icon: 'image:///images/pic_download.png'
                    },
                    // 自定义工具名字，只能以 my 开头
                    myDownloadBtn:{
                        show:true,//是否显示
                        title:'下载excel文件', //鼠标移动上去显示的文字
                        icon:'image:///images/excel_download.png', //图标
                        option:{},
                        onclick:function(option1) {//点击事件,这里的option1是chart的option信息
                            alert('1');//这里可以加入自己的处理代码，切换不同的图形
                        }
                    }
                }
            },
            legend: {
                bottom: 0,
                left: 'center',
                textStyle: {
                    color: '#5dc2fe'
                },
                data:['是', '否']
            },
            series: [{
                type: 'pie',
                name: '数量',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [{
                    value: 23,
                    name: '是'
                }, {
                    value: 35,
                    name: '否'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        chart2.setOption(option);
    },
    setChart3: function() {
        var chart3 = page.initChart('chart3');
        // 指定图表的配置项和数据
        var option = {
            color: common.color,
            title: {
                text: '人才数',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14
                },
                left: 'center'
            },
            tooltip: {},
            legend: {
                type: 'scroll',
                textStyle: {
                    color: '#ffd152'
                },
                selectedMode:false,
                inactiveColor: '#574c4f',
                data: []
            },
            toolbox: {
                show: true,
                z: 2,
                right: 30,
                feature: {
                    dataView: {
                        icon: 'image:///images/dataview.png',
                        readOnly: true,
                        textColor: '#fff',
                        buttonColor: '#D53A35',
                        buttonTextColor: '#fff',
                        backgroundColor: 'rgba(0,101,153,0.5)',
                        optionToContent: function (opt) {
                            console.log(opt)
                            var axisData = opt.series[0].data;
                            var series = opt.series;
                            var tdHeaders = '<td></td>'; //表头
                            series.forEach(function (item) {
                                tdHeaders += '<td>' + item.name + '</td>'; //组装表头
                            });
                            var table = '<div class="table-responsive"><table class="echart-table" style="text-align:center"><tbody><tr>' + tdHeaders + '</tr>';
                            var tdBodys = ''; //数据
                            for (var i = 0, l = axisData.length; i < l; i++) {
                                for (var j = 0; j < series.length; j++) {
                                    tdBodys += '<td>' + (series[j].data[i].value == undefined ? 0: series[j].data[i].value) + '</td>'; //组装表数据
                                }
                                table += '<tr><td style="padding: 0 10px">' + axisData[i].name + '</td>' + tdBodys + '</tr>';
                                tdBodys = '';
                            }
                            table += '</tbody></table></div>';
                            return table;
                        },
                    },
                    restore: {
                        icon: 'image:///images/restore.png'
                    },
                    saveAsImage: {
                        name: '人才数' + (+new Date()),
                        icon: 'image:///images/pic_download.png'
                    },
                    // 自定义工具名字，只能以 my 开头
                    myDownloadBtn:{
                        show:true,//是否显示
                        title:'下载excel文件', //鼠标移动上去显示的文字
                        icon:'image:///images/excel_download.png', //图标
                        option:{},
                        onclick:function(option1) {//点击事件,这里的option1是chart的option信息
                            alert('1');//这里可以加入自己的处理代码，切换不同的图形
                        }
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                //坐标轴轴线
                axisLine: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, .9)'
                    }
                },
                //坐标轴刻线
                axisTick: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, 1)'
                    }
                },
                //标签
                axisLabel: {
                    color: '#5dc2fe'
                },
                data: [{
                    value: 2017
                }, {
                    value: 2018
                }, {
                    value: 2019
                }]
            },
            yAxis: {
                type: 'value',
                //坐标轴轴线
                axisLine: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, .9)'
                    }
                },
                //坐标轴刻线
                axisTick: {
                    lineStyle: {
                        color: 'rgb(239, 218, 185)'
                    }
                },
                //标签
                axisLabel: {
                    color: '#5dc2fe'
                },
                //分割线
                splitLine: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, .4)'
                    }
                },
                axisPointer: {
                    show: false
                }
            },
            series: [{
                name: '人才数',
                type: 'line',
                smooth: true,
                data: [
                    {name: 2017, value: 122},
                    {name: 2018, value: 129},
                    {name: 2019, value: 152}
                ]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        chart3.setOption(option);
    },
    setChart4: function() {
        var chart4 = page.initChart('chart4');
        // 指定图表的配置项和数据
        var option = {
            color: common.color,
            title: {
                text: '培训次数',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14
                },
                left: 'center'
            },
            tooltip: {},
            toolbox: {
                show: true,
                z: 2,
                right: 30,
                feature: {
                    dataView: {
                        icon: 'image:///images/dataview.png',
                        readOnly: true,
                        textColor: '#fff',
                        buttonColor: '#D53A35',
                        buttonTextColor: '#fff',
                        backgroundColor: 'rgba(0,101,153,0.5)',
                        optionToContent: function (opt) {
                            var axisData = opt.series[0].data;
                            var series = opt.series;
                            var tdHeaders = '<td></td>'; //表头
                            series.forEach(function (item) {
                                tdHeaders += '<td>' + item.name + '</td>'; //组装表头
                            });
                            var table = '<div class="table-responsive"><table class="echart-table" style="text-align:center"><tbody><tr>' + tdHeaders + '</tr>';
                            var tdBodys = ''; //数据
                            for (var i = 0, l = axisData.length; i < l; i++) {
                                for (var j = 0; j < series.length; j++) {
                                    tdBodys += '<td>' + (series[j].data[i].value == undefined ? 0: series[j].data[i].value) + '</td>'; //组装表数据
                                }
                                table += '<tr><td style="padding: 0 10px">' + axisData[i].name + '</td>' + tdBodys + '</tr>';
                                tdBodys = '';
                            }
                            table += '</tbody></table></div>';
                            return table;
                        },
                    },
                    restore: {
                        icon: 'image:///images/restore.png'
                    },
                    saveAsImage: {
                        name: '培训次数' + (+new Date()),
                        icon: 'image:///images/pic_download.png'
                    },
                    // 自定义工具名字，只能以 my 开头
                    myDownloadBtn:{
                        show:true,//是否显示
                        title:'下载excel文件', //鼠标移动上去显示的文字
                        icon:'image:///images/excel_download.png', //图标
                        option:{},
                        onclick:function(option1) {//点击事件,这里的option1是chart的option信息
                            alert('1');//这里可以加入自己的处理代码，切换不同的图形
                        }
                    }
                }
            },
            xAxis: {
                type: 'category',
                //坐标轴轴线
                axisLine: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, .9)'
                    }
                },
                //坐标轴刻线
                axisTick: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, 1)'
                    }
                },
                //标签
                axisLabel: {
                    color: '#5dc2fe'
                },
                data: [2017, 2018, 2019]
            },
            yAxis: {
                type: 'value',
                //坐标轴轴线
                axisLine: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, .9)'
                    }
                },
                //坐标轴刻线
                axisTick: {
                    lineStyle: {
                        color: 'rgb(239, 218, 185)'
                    }
                },
                //标签
                axisLabel: {
                    color: '#5dc2fe'
                },
                //分割线
                splitLine: {
                    lineStyle: {
                        color: 'rgba(93, 149, 254, .4)'
                    }
                },
                axisPointer: {
                    show: false
                }
            },
            series: [{
                name: '培训次数',
                type: 'bar',
                barWidth : 30,//柱图宽度
                barMaxWidth:40,//最大宽度
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 5, 5]
                    }
                },
                data: [
                    {name: 2017, value: 122},
                    {name: 2018, value: 129},
                    {name: 2019, value: 152}
                ]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        chart4.setOption(option);
    }

};
$(document).ready(function() {
    // 正常情况下，先加载数据 在调用以下渲染图表的方法
    page.setMap();
    page.setChart1();
    page.setChart2();
    page.setChart3();
    page.setChart4();
});