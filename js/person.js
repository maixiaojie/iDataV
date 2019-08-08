/**
 * 个人工作台主页  单位管理员
 * Created by root on 2019/8/8.
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
    ]
};
var page = {
    // 根据 id 实例化一个 echart 对象
    initChart: function(id) {
        return echarts.init(document.getElementById(id))
    },
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
    setChart2: function() {
        var chart2 = page.initChart('chart2');
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
                left: 'left'
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
                        icon:'image:///excel_download.png', //图标
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
        chart2.setOption(option);
    },
    setChart3: function() {
        var chart3 = page.initChart('chart3');
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
        chart3.setOption(option);
    },
};
$(document).ready(function() {
    // 正常情况下，先加载数据 在调用以下渲染图表的方法
    page.setChart1();
    page.setChart2();
    page.setChart3();
});