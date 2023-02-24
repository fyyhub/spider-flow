/**
   * 加载各种图形
   */
export function loadShapes(editor, container) {
  // 定义图形
  var shapes = [{
    name: 'start',
    title: '开始',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABwUlEQVRYR9WXz1XCQBDGv9GD3sSDkpvYAR2IHWAF0oFsBUIFGyoQK1ArECpQK8BjcsMbnj7fRsN7hPDcCRt87nl25jez828FinNq2d0TWAINAR4XhJkbmStUrImK7+WGZeNAMBOgkd8hMUqN9H11lMl5A/x4/1BUsiCOt4mCN0BkOYDgds0L4jIxMqkahX8EEHMGoFX0NOmLtxOVcyCy7EDwXFRA4iM1skzKKs/gRd+M+SJAuwTgKTXSrWI4v/MrQBTzDkCvzAgJkxqJawOILHsQOIDyQ5wnRt5rAWiOeCPEZu+I+8RIaWQ0QGtP4DreocBuCvtSeQDvna4VgGjEaxCDsnLTeOUpO3azJAM4sWzvf3vd8bwcRowYZgBRTFfjuzXuDBNTiSxbELgut/vjIrCpy9VNk4/y0ABZYmnGc2gA966q/lAHwDQx4p3QwQG0a1owADeaAYw/gcFf5cBkQVxpjGetOGQZklDvB6EB1BtSaAD1PyEIAIk3AeLEyFjbQYMAAKiUgHkSBhlG2vpfWUojywkEF9rwrcgTqg5YBGgReBXBUWUIYpgYcduU6ixXsmwXRLaEuk/Ima+WbRLQ2fgC+RzXgT1bPk8AAAAASUVORK5CYII=',
    hidden: true,
    defaultAdd: true
  }, {
    name: 'request',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACbUlEQVRYR+2XTXLTQBCFX5sF7DALsHaYE+AbxD4ByQlITmDrBCQnGHMClBMkOUHMCRAnIOwU2JhdssCPamnkkmRJM5KTKqpgqryxpqe/7unpH0HHFRhOIXhPYCLARMUJxALEIM6TUFZdjhTfzS8NJ08EBsDUIbP6TYQ/Q4l9zvYCUKspuBBg6HMogbUQRz7ecAKo5QPBta/yHFAhNsTM5QknQLDkNwBjH8tr9twkC3nTJtsKEBgeQ/Cpp/JMjDhJQomazmgFGBleiuDdPgAkrm5DOewFECzJfZTnsslCGg1NPwSGYwqMCOJkLme54GMAvDI8HAjmG+Ljj1AuUwD754VVHCULORkaDp/ZRLOvF+6AeB3KuhRTWdI63rqmct8RBmgMnD5AJCZCLNO4JL7eA1OF2gKoxU+BlQje9lHgK1NUrjKl4OgMQcxsLVj6gFeV7wDYgDyF4IOPRXl0B4YrCA6cMsRZEsppcd/O8wgM/wP8Yx4YGWqiLOZ7rXxe1a9zEAI3yH5ZnSKuZJ902wNg56FImobLKVd7PveTAtAZgPgMYNszbrJesrz+hmeoHrh2JpUeHtgQR1oBXYno0QBAzKqNam2jMDJci+C5ywtdY+COeKEVsNUD+nFkqMVl/pAATa1ZrQfsEPLlIQHq7r+2GqYlOZsD0rGrbXW5Ah3f7olZ6xVUlWv9bqvzXgDEdwhe275hB6LcERUtt/18YBjpMFrnCSeA7fuKvWDVE1uAkqLKMJEeAGiVTC3JVxMAiV8CLIoDSV1DWooBLUqqpCpYVGjTtg4ZY03XJYBsTF8TiKrJJj8jhyAR3oaSNqh/AKendd/nwfiIAAAAAElFTkSuQmCC',
    title: '开始抓取',
    desc: '抓取静态HTML页面或者API接口，抓取结果存为resp变量中。<br/>支持方法参考命令提示。'
  }, {
    name: 'variable',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAgCAYAAACYTcH3AAACe0lEQVRYR+2WMW5TQRCGv0mEoMMUKK80J0joKJBITgCUVAkniLehjQ+A9GwugLlBboA5QZITYLpnaEwXkZhBs+xu1s8vkhMDMpItudh9szP//PPP7Aor9JMVwsLqgmmV2roD7W9OTpsYe1jqzgWMJk4m9e/FO30W986nnDXZ1P2bPzsT480ws9XTE4EdlNeVk0EesCj1AOE9MKw6smffzPk9oQQOGsAPz5WXOajcP4KB9+cUTrng6SyYUici3M8DxiDRkSpnYyc+o+TcHCpnAhOFlgjb4VwCbuuipxr2R0A7T0DhSR1MT4RDb6Q8qpzYIYpS2wif/bbixk56Ram7CB+D7QyTRanDkDlVR1KMDIz5/wAMfhp4aJvPGTBNQT0DpSaQ58oDo95KdBeslKOxk06eZW6Pslc5GdaYIfrJz811U8zK6jjuyOPgxFhpWzaVkxl9eN1sso2ya3+FHYFWCtIERvlUOdmt66wJTBSqL5UHcVWOlKUH2dcjVToxuCrfTW9+/Vug5mOemUXBhLJ4IavSD473Ub5UTpLosu7y9Z9CL7ZoUWoX4ehPgYkaGfnugFYUbuquUo9FeG7rXKQhmfRtaWZyIadBFoQb10WpA4T9vJu8fjY4ROlmmkmdlrrpJmUK7Zzas0m4Nj03hZO6CEP797MRkUSfgZlrBDt37d1kwTZgYIPMJmWcOXnwYNP1UxtsJtm/a7amKYWOQverk+OQoDF2MIUXTVfO6l6UTZT/y701M9exvWZmzcxNO3F1NbPV18OZt8hNU1vCXn/w9upJmD0tl/B566MqvKo/O+3umHuB3TrC4gdHesmb1dXM4on8Hcs1M//FBP4FX81QGwO29kEAAAAASUVORK5CYII=',
    title: '定义变量',
    desc: '定义流程变量。<br/>定义变量有先后顺序，先定义变量后续可以使用，拖动可以交换变量顺序。'
  }, {
    name: 'loop',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADO0lEQVRYR9WWS2hTURCGvwnVlVjpzgdWxQeo0IWP7rQuRBQVFayLSlUQH5V2UWhzo4takOTGCF1UlOJCKyJiFxUFSwWxioguRBEV31qhVXeKSI3ajJybGxPTJDdpCtUDIeFmZv7vzpmZc4RxXjLO+vzHAH4tZZhySihzsih8JCTPCs1o/hlo0UlE2QlsA2YD0zOI3QV68dFBUD7kA+MN0KIT+U4zwg5gbkrQn8ArYELac2MyCJzClsNeELkB/DoT4SJQ6QZ6AZzFRw8TeEyr/HCeH9YyhqhEWAzUAbNc+26GaSIir7OBZAcIaCXKbaAEGAIaidJJm5jf2ZelRrwFnO0y6wlCNSF5mskpM0CdTmIyX12HAWLs4Khc90rnX/9bagBO/4FQ1hGW9+kxMgNYesEpNuUtw2zimDwqSDxhbOlupxbMUjoIyz5vAEuN0UnXqYawnB+VeBKiCTjqxjNZ6EmNNzIDlt4AqhDaCUlDUeJJiHNATaaYIwECuhClOp8WyhsuoOtRrjhta8u83BnIO2qBhpaq67EUW+4nvP/OgKWm55cBzdjSVaBEZnOzpcoUBDMlTX3tdVs0ii2rkgBx8a0pUcw2FA9h6QAwzZkHsCjlexBbpscBRoonOIqHCOhGlLNAacrLfUGoJSSXBUurAFP55kTrRylH+YwwBegzaSp6K/y6AnGG0hzgDcouwnIrLmmWXyP4uIk6J912FNP7gwjfxqwbDupiYrTjo56gPM5WhHuADicDMZYTkZdFv71HgPQuMMdtXFRpICztYwJgqSnuOpRDhOWO1yS8CqwFerBlXdEAAZ2PYg6yGUBr+paOnIR+rUXodIXbsKWxKIhkhw3gYwlB+eQ9Cf16HOGAa1iPLcdHBWHpEeCQ67sGW66lx8l+IUmdDUITITlWEERAT6Dsd326sWVLJv/cV7Lk/Da+ffiwCUpvTpD4wWO6aYNr14Ut1dl8vC+lliaKMh5DuYQP08cP8HEP5RcxKlAWIKxOETbWFraEcwF7Azhh1LyR+Szx3AYzQ+AMMTqJyEMv+/wAElEs3QxUACvdA2YqEAWeu/Oj3xG35Z2XcOZJmK/XGNoVloExFP5nMvAbItf8IXnK1DcAAAAASUVORK5CYII=',
    title: '循环',
    desc: ''
  }, {
    name: 'forkJoin',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADWElEQVRYR8WX34sVZRjHP9+tqJtA+uHMuY2gOwkSgugfCLopSLMNE6tNVDwzq6hYrLvBlhvovCNsucUWhiYaeBV40z8Q1E13UXQVnjlh3XQZ7TdGz7F1d+bMnEPie3ne93m+n3eeX+8R93jpHuszMcDjmZ++Tzwn85f+4dr1I7oxyWUmAoiCdwLnBGvAA8B11pgrZnVlXIixATqZpy0uYBaKVPNbMm95SJwDdlpM97v6ahyIsQDi4N3A+aH4eqEo9wWZaeCNItGXbSFaA0RnvVdrrFaJD8Xi4PPAbps3+6k+bwPRCqCTe8ZmZZT4bYjMq4i9Eu/0uvq0CaIRIA7eDyy3ER+KRZlXJGaAA0Wij0dBjASIgg8J8nHE14VjGdhv6PYTna2DqAXoZJ61OD2J+FCsE5wbDkkc7nV1pgqiEiDOfRSzVCceZU40xS7Mkzedil+8xqV+qrBRJM5dXmIWcazo6qON+5sAOsEnDIt14nHmecTJcl/wY+nQsG34W9kbNkFkXkIcFbzbS/TB+v07AOLgOWChVjz4FeBKkaj6ywUb2FEk+nojRBS8KDgBnCwSvT/cv+2ok/sZm+8b6rzc/6bqlqXDwdd5sUi0vSrecfACMCexvdfVD7eiN1hR5rJ2TxWJttZlbBz8p82BfqpLVWeizLsklotEj1TtP7bkh+9/kN+Bw8PyHBfgD5m3e6muVgl0Mr9s8VmR6NHaS2T+GZFtAmgVgtzfsca1kSGY4oWiq2crQ3DGO5jicmUIbsawKQkHFTAqCW3SynL8b5DNF6nKXBhU8AbUpjKMgq8KXiqT1fDTIJGeGlWGw1ki814v1WJtGd5uow2NKM68B3EQeGJg8yuwVFl+ubsyZYM6XiRaamxEwwP/RyuOg48Bp4AjRaLTVXlx94bRIF8skn5XeV1V3JVx3An+0HAcc7BIVU7F2tUIUFp2Ms9Y7R4kUXAmSAT7eolWRonf0QmbDg46ZdOT7BNgn+GtfqLVJp9jAQz6RO2jNA7+AiirY0/RVfk2bLVahWC9pyj3azIX1w+tOLicDa/KvN5LdbGVcl0jamMc32qp5TPrt0E769jM9hNdbmPf2IjaONkavG0Kni//mv0N395I1Wtj17oRTeJsEpuxc2ASkVE2/wK1YaYwksZPTgAAAABJRU5ErkJggg==',
    title: '执行结束',
    desc: ''
  }, {
    name: 'comment',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD/0lEQVRYR82WT2hcdRDHP9+XGL1YpaTZtzGEotX0UISSih78Uy8t2ksrVPBkVVBKafZtbNOjFUGIjdm3W0xVCjagXrSVglT0orQHlVrQIIoYK2hNXkwo0XowJdmR93Y3vt0k+3aDVn+w8Njf/GY+v5n5zYz4j5eate/6thu4C1gHdBjMCS4a/OSInx1x/pc+XWpUb0MA6bz1mvEkEBoPDddbM4gTBqNTGX2dBFIXIJW3TRTZL/H0MoquAt8jihTpQbTVyMwjjgUZ9dWDWBHAzdlWHN7C6IwUGOOI44Jxc/g26NM3ccWdvvUsQI+MjYh+IFXev6gieyb7dW45kGUB3JwdRjy3eMA4utDGi9P7FCS5NNyPYERBxraYjueDrA7Xnl8CkB62+8zhbOzgw0FWHzRiuFbGzdkAYjCm68Egq0/icksAXN9+AG4NhQJPDSVpEpzrm0UyYsJgezw5qwy4eStg7C/H/FCQ1UsrKe8csvZiC58i5lqL3H+pX5dXknVz9hDiTJRKxutTWT1TkV0E6Mrb7fMwhnGDiY+mMtpe72ZVeWIsG9/4eTdnBVS6nMSWyYwulJxSXjGFUw48MOHpuyTXpvL2powrgae9SbLrXjG35SrnEBuAkcDTvkWADQW7/g+Lbn8HcCDw9HKSwtXsuzk7gDgCTAeeOhYB3JztQLxfjv2STF3O2NqCrWkrcjrc+9PYNZvVbBJUeti2mcOHZblHA0/vRCFwc7YXMRJ+z8+xZuaQriQpiwqV+HgV0L+VdR8JPA1UAAYRA8CFwNOWJONl6KYBonO+fQXcCZwIPD1RAvDtJPBI7RNJeAWrAkj7dtzgKeBM4GlHBJDy7ZRg17UAcH0bAp6VOD2Z0c6KB6I/r0UI0r69bfAY4mjYKSseCD/y/3YSlsMdJu5WjINBVkMRQDpvoftPNZPRq3kFbs7WI34s29kdZPVuCcC3bgvLMNzUaCFaDUAqbxkZPjDT4rA5HN3+LsV5G8EIS2pDpbhZgKpSLIaCjA5W9YK0b/caRFNLg82oqWcYa0bzJjZXWnJVO0759p5gZzlGddtxMx6It2MgqoCVGlMF0FGw21TkC8HNoUC9gaRr2NbOO7yKEdDCC0GfplcqXIsDCXweeLonLrd0JIu/iCge/GMjmQMba9v8/28orbgnnGyLMArcXc6JceA1GWNzrXx2uU+/x13ZPmg3trbRi+gFwgyPxnKDWYn+IKM3lgtR4tDp+hbOhVmgtUbBmOB80VhQyWj4q1phbynCsemsvlwpPxIBomaVt02CxzH2AO1127WYoMhJOYxW5r568g0BVBTcUrCuhQXCLF6PQ7eg24zrgF/DMcvg7JSn0mTV4GoKoEGdTYn9Bf4L6DCOEiGKAAAAAElFTkSuQmCC',
    title: '注释',
    desc: '仅仅是注释,毫无作用'
  }, {
    name: 'output',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAByUlEQVRYR+WXwVHDMBBF/4YD3AgHwEd3QKiA0IE7IOnAqoCkAqWDmAqACggVJJTAzRku4UYOmWVWloMZgi17bGcGdNGMrZWeVtrdL4JtXc3dI8I9gH76rWIfxSENXW0pHehpHoAwdTXMHccYx4pGLnNlAUYg3BojxtjFODPGB+Hmmw1jGCuKiubZCRCHtP1eNIH89zT3QXgy7IwXIlzYjRRC1A7wwTg5BGauELUDiPfkQrtCNAIg7neFaAzAFaJRAIE41dzrJHfieNfFrB2gMGoYz7GibbL7GwAmjQO9vN0zMDGh2YQHCt2eJKsZCFf/F+A3L9VyCV2OQMLxgKA3DPWmaJHatAbgaTbVloHFmnG9UrQSiDYBfFlcEpL0y5AuWwWQxc40B51EdUkzyqmUB6xs0wB8l3PfNYaBHgFdqx1UKYCs8KgKkLVjYFUKwJbYKN1BFQjjga/CNC4FUGXBrI0NxbmtinexokFrAJ5mnwlz8Z7oxjXQl1BsEyDJA4z3NeC3ngeM+4HJBgj3kgn3XgvONRs9IOe/VBTuoxa46wEQnN51pcKSMTAZNEcR1fc4zSFjxuNSUfDjCKyuezCyqanGeN0AQTYKPgFOSUMAph/CYQAAAABJRU5ErkJggg==',
    title: '输出',
    desc: '输出流程中的变量结果（仅测试下有用）'
  }, {
    name: 'executeSql',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD1ElEQVRYR7WXUXIaRxCGv4YqR2+WH2zxZukEUU5gdAKjExhfILAnMD7BohMYn8D4BEYnsHQCobfd5CHkDVIFnerZmc0sLAJjMlVUSbszPX93//13r7DnOk319JcGb0TpAOfRzyxMw0+F8WLF7SyR2T6mZdemVqrnCB+A7sZe5dE9E17X2BmhfMwSMXBb11YAzmPhg0DfnVYeFcYKkz8SGddZfJVqR6At0ClBCYP5ipttEakF4C//JnCpyt/AIE9kuCta8fuzVA34QITnCncL5aoOxAaAl6leNgS7/FSVrwvo7pvPdYDOERiJ8FZhtlKu/kzkLt5XAeA9f/CX3+SJFOH/yXWW6lCEnoFYKBexQyWAtbAf7fKAPQJRSUcJoNygfM0TsVI7+jpLdWzp8NUxKAoI8KX2YIRbwPmhOd+F2HNiasREubASDQBGCO9USdbZ3kq1TRPNfpfb9Qsc8CavWfIY17sRudnk+XzJ/bozrVQHTleUz1kiXTFUJ8JfVudZIqZwbjkjwhevePZoulSuA4tLQ36/wjDvS+IjOkF4g3KVJTKpAT41nZgrL8TEoyF8UaVCvFaqbpOVooEQ4Ver57wvv7moCN8sZVKIU8eH9X2WyKiV6i4ALuIr5VpaqZb/BIWLOHGfJ3LpvXKAsr7YGRdGM2Bn1p3YBSDstzSYMYfWDIdQBQ9RbrNE2h6A9YLzLJFBlEcX4vX9uwA4e0NVs28ASs/iXLkN1uWKPFYayrEAWErFI6kQ0IAEXbC/rQmJchMIdRQA3nEHIJCrhq0mFt2ysxXt9TgpKAFsSUElHakaiE+m5XlfXhwlAua4cl9LwjpFi8l6LACBhBtl6EUo9Wo1isUlLkMj6BJmTaHnUuWrZlcVVMqwTog8gO+BG14tv7syjHTApNuGFhMVF7X/OLK/EJVSDNOsLxdR+7wz9aukw+u3CZUrIWsq0QqTzwmMnRRXX8aaUpb+1mbkgMHQZNa3zfEc+qG5mPiY/juJLuR6YvPjEjoN6LrIrIGzAWejGfn82uT7UDex1BHy0GfxxFVpxx6E03cTnbwv14de8tS5iJxOT3xkiyN+WJj4kP5/I5lyv4B2SOXmUApuYon7+89GIxr3Niau+rHcCFWAGC+U94eOaD7nn+xDxWaHFbSfHMuDp5V0wAxhkPfk5kciYWxXoedH/ErYYztPfpqd2GdZ8V1oa2oRQZjkPbGy21he1N4CNkMU453ycQ7DH/o0iy276QisQgq1q64wJ5SzZPla+WznDv44Xb/J0vIM2o1CmEwJT4NSuq5mqYLpCsb/wGRf3vwLgODoY+vqQ1gAAAAASUVORK5CYII=',
    title: '执行SQL',
    desc: '执行sql，需配置数据源，sql执行结果存于变量rs中。<br/>语句类型为：select，返回:List&lt;Map&lt;String,Object&gt;&gt;<br/>语句类型为：selectOne，返回:Map&lt;String,Object&gt;<br/>语句类型为：selectInt，返回:Integer<br/>语句类型为：insert、update、delete，返回:int，批量操作返回int数组<br/>sql中变量必须用 # # 包裹，如：#${title}#'
  }, {
    name: 'script',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADD0lEQVRYR92XTUhUURTH//8xyzYRJM2MuZCoFrk0iD4WFQiJRSsnF4GmIFHkvEdmUIEKRZjVm5EoDErcmS4rSgpzIX1ArcIWYSZt5vkBSUWM0zgn3nPe9NSx+XBeQRcGZuaej98999xzzyX+8aDl3xuUMonhcE54iBFdYX86thIAHk1aQbSko5SmzGld4c1UsksBBG2plFLOxxdC4krIz/N/kk8GsF9XOZTSyTICHk32gXiemCZ6NnjRMOJjJJmK8wDzXgchqNdVji+G+FsAgGA05kLNpJ8v7BA5BzCMewIiy+zQLIEjIYUD1rwzAEFpgaAKQOkSEEGbrrLVUYBkq08k5/8PUCV56Ofc4iisOAKeoLRTMBZS2GU37g3InZigd0LlYFFAymOCE9EIaqfP8ZtdLmuALZ2y5rvgFgR1AEbggk9v5HvDuDcoB0Xw2HTkQili6Isn3sBcBLVTzdQtiKwAim/Lpp+z6CZQDmA4KvBNqwzZjD4EUSnE5Qk/Lxa2S1HeavSR2APgVSyCY5PN/GgeTatCZpKEnoAYRWMXiAcF6+AbP86w5dytSR2JuyA+hGPYOaNyxpgrviFroy4zEocAvNQV7l4JQC+AoySe5efD9/kkvxjGSjRZH3bhNQTbRFA/ofKeBVbSLQXhr+iDmFf7fV1hddYA8ap2FcBZAGMkfCE/37qDcomCCxA80lUaKzVHoSbeVTRXvxdAh66weUU5kFAOyBkA18zfRKXh2PxKVIT8fGKCdsp2WxI26Qqv5+QUJCCCUgPBD6PTcWtywEVUhxQ2LHJSARc26n725LwOJCuvmfyX1SnIxEE6smbbBwzZGx5HbsN0YCwZRwE8AXljONIV7lgOyjEAtyabSZhVUFeY8LMYxBEAY69dwNMYMRx3+LvJFbzTVTY6tgUeTUpAfAJgNKAlSUNvuw+ciUBQOiBoWjYZUwBk/DCJAl32WzJewo0ELMs8ApmcIUtWsOQx4w1KgwgWNC+W+Fw+tk6d4uh8ZY+PlTxOk0XAjILRAwDGJzHsHfECgGwWngudX+XU9zD0knfOAAAAAElFTkSuQmCC',
    title: '执行脚本',
    desc: '单独执行脚本方法'
  }, {
    name: 'function',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAgCAYAAACPb1E+AAAC9UlEQVRYR+2YP0zUUBjAf9+RKJPgQK6THptxERPiZOTUxEUj/tlMjCS62xoT3YARl5bJTXByBGcHISQmxhjQ6A6TPRg8JrnE62de6Z0Htne9XhMw4W1N3/u+X7//rwJgzeokygRQMs+HYSksBsr0liNrYrk6gTB3GMBiGNZ9W4al6OqiCOOqfFGYKkD1oIEVRkRwQw5l2FhyCWEMZdp3ZOqgARv6LU/1CDIPbxxZMg8rhmUxj5gcdHWw6khiJSh6+lVgAGXMd2S90/79H9czpOXpd+CsKk7FEe8fBab2whwCdeF6n/ISOFUPuLT1RFbSWLsnSMvTOVUmREJVM74tz1uVGov1C6tR9/rs2zJqefoL6FfYDpSy6SKdQDNDGkAI2yeqvKk4ci/GilMIk40aZ1w95OpIQVgWOKFQDZTLnUAzQbYCorz2HQlhW5flakmFVYFBVWYrjtiN9yEoLIkwkAa0a0jL0x8m4SLrxAKGGenqPMIDVbZrUNqfWE1Qk1AFqAc83HLkVZzrs0AGgKhQDwJG41xluVpGeB99SGKLtTx9i3LTJFUAC5u23MkFcsjTZwWYFjie5CrLUwNYRtnwHYkd+fbENHyr/eZG9als5AJphLSLqdZxL1BubzqyGFP3mkmXFNN74jtrMW8FRdgB7u4EfGiWHGXZd6QcA7iCcBEz1yQkXa7F3ID2wUeEY0HATJ9wRoVxo6SunI+N18gqCu8qtlzrVCNzaYtFVx8BVwJ4UYB5Ec4pfKrYciEOoOiqjXC1ptxv10pzcXccQBQC5VqdhaQkSGO5XN2dRWGWM13XySxKej1zBNmrBRvnYy25fyDIS1kWOdG49zNqseG92xPhcSRsqWuhgoXSn3jOFH3F71Kuaatha91RTpp7d0lhzYxQXQra3W66yO4AHL86vW+nNOpOofgI9JaZAzOAmt80p9tAmgFivlu5Aaw1ZoB2Nkglt/kHJNmSsf08lfBoU2pIy9W/14JuNCTs9e3olpRC1n8B+Qd0Dhp9ddQMugAAAABJRU5ErkJggg==',
    title: '执行函数',
    desc: '单独执行函数方法，结果不保存为变量'
  }, {
    name: 'process',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACMklEQVRYR+2WwXHTQBSGv+fMkNwIB7BvMRVgV0DoIFRAUoGlCpJUsKICnApCB4QKcCrAvslwwEebGfyYp2g1QgmytBmPOaCjtLv/t+/9+neFHT+yY31aAxw6PdwXzgVOgH5lA1OEcTqSy6Ybaw3QdZqIMKoTUOX9PJaoCUQIwEKEp7+U4fdYJmWR504He8IXYJpG8tK+9RJVP0ZhIkKSjuTKv9sOgDJLY8naUwYog6yUN4tYFq0Bek4vEM5ry6tcprFclMeYd57AcQcShCOrxjySYWsAWzTzgZlQOPoDRJkB46p4FeQAJtlc5SwIoIm56sa8cHrSEa4zTzx2sZD51o4D4YfN3QlAz2kf4evOAIoWKLetKxCShD2np2ksY9txXn7Lin6QCdsmoYkjfFgqz/Y7vBYlMXFVbuexDB6sQNdphPBOYOBNlkaSje06bZyEXrxqVBNfwfG9IMrL+6ksHASQJ2EVwIQFEt+OeybsOrWsfoUyW0P0E26MsryDtknoIXwFq9UoWmBlF8GZ+BIGVeHyxLZJWDZhHUC2+7Xy9lssH0MCJmROUQF/aplb63YfIlI3598B8AbcWQsKE8J0qQx9G3pO7Xg99WUMScJGLchD5u43hKkK0WrN5/zUGqeRnBV3gW3dCbPdwU0OUQXPINokYRPDPhjF9t8qWC5YNe4e5cpa0QigdCfcBLHxNMx+z1zcFmubhI8HqJiw8EHgnfCvSbiJdFvfN7ZgW8J+3f8AvwFIqFFyobd5IgAAAABJRU5ErkJggg==',
    title: '子流程',
    desc: '执行其他spiderFlow流程，父子流程变量共享'
  }]

  var addShape = function(shape) {
    var image = new Image()
    image.src = shape.image
    image.title = shape.title
    image.id = shape.name
    image.onclick = function(ev) {
      if (shape.desc) {
        // layer.tips('(' + shape.name + ')' + shape.title + '<hr/>' + shape.desc, '#' + shape.name, {
        //   tips: [1, '#3595CC'],
        //   area: ['auto', 'auto'],
        //   time: 4000
        // })
      }
    }
    if (!shape.hidden) {
      container.appendChild(image)
    }

    if (!shape.disabled) {
      editor.addShape(shape.name, shape.title || 'Label', image, shape.defaultAdd)
    }
  }

  for (var i = 0, len = shapes.length; i < len; i++) {
    addShape(shapes[i])
  }

  // $.ajax({
  //   url: 'spider/shapes',
  //   type: 'post',
  //   dataType: 'json',
  //   async: false,
  //   success: function(shapeExts) {
  //     for (var i = 0, len = shapeExts.length; i < len; i++) {
  //       var shape = shapeExts[i]
  //       addShape(shape)
  //       var image = new Image()
  //       image.src = shape.image
  //       image.title = shape.title
  //       editor.addShape(shape.name, shape.title || 'Label', image, false)
  //       resizeSlideBar()
  //     }
  //   }
  // })
}

