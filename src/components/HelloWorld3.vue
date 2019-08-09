<template>
  <div class="hello">
    <el-button type="primary" @click="addCol()" class="addBtn">添加行</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="flag" label="标识" width="100" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.flag === 'del'" class="el-icon-delete"></i>
          <i v-else-if="scope.row.flag === 'add'" class="el-icon-circle-plus"></i>
          <i v-else></i>
        </template>
      </el-table-column>
      <template v-for="(col,index) in cols">
        <template v-if="col.type !=='sel'&&col.type !=='date'">
          <el-table-column :key="index" :prop="col.prop" :label="col.label" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row['_'+col.prop]">
                <span class="save-span">{{tableData[scope.$index]['_'+col.prop]}}</span>
              </template>
              <el-input v-if="scope.row.isSet"
                  v-model="tableData[scope.$index][col.prop]"
                  @focus="edit(col.prop,scope.row[col.prop],scope.$index,$event)"
                  @blur="leave(col.prop,scope.$index,$event)"
                  />
              <!-- <span v-if="editable[scope.$index]">{{scope.row[col.prop]}}</span> -->
              <span v-if="!scope.row.isSet">{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="col.type ==='date'">
          <el-table-column :key="index" :prop="col.prop" :label="col.label" :sortable="col.sortable" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.oldDate">
                <span class="save-span">{{scope.row.oldDate}}</span>
              </template>
              <el-date-picker v-model="scope.row.date" type="date" placeholder="选择日期" @focus="dateChange(scope.row.date,scope.$index)"></el-date-picker>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :key="index" :prop="col.prop" :label="col.label" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.oldSel">
                <span class="save-span">{{scope.row.oldSel}}</span>
              </template>
              <el-select  v-if="scope.row[col.prop]" v-model="scope.row[col.prop]['value']" placeholder="请选择" style="width:100%;" @focus="changeSel(scope.row.select['value'],scope.$index)">
                <el-option v-for="selPart in scope.row[col.prop]['options']" :key="selPart.EAF_ID" :label="selPart.EAF_NAME" :value="selPart.EAF_ID" ></el-option>
              </el-select>
              <!-- <span>{{scope.row[col.prop]?scope.row[col.prop]["options"]:1}}</span> -->
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.flag !== 'del'">
            <el-button size="mini" type="danger" @click="delleteRow(scope.row)">删除</el-button>
            <el-button size="mini" type="danger" @click="changeNum(scope.row,scope.$index)">{{scope.row.isSet?'保存':'修改'}}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      len: 4,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          flag: 'del'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          flag: 'del'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: {// 下拉框的当前值
            value: '双皮奶',
            options: [{ // 下拉框的所有值
              EAF_ID: '选项1',
              EAF_NAME: '黄金糕'
            }, {
              EAF_ID: '选项2',
              EAF_NAME: '双皮奶'
            }, {
              EAF_ID: '选项3',
              EAF_NAME: '蚵仔煎'
            }, {
              EAF_ID: '选项4',
              EAF_NAME: '龙须面'
            }, {
              EAF_ID: '选项5',
              EAF_NAME: '北京烤鸭'
            }]
          }

        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ],
      cols: [
        { prop: 'date', label: '日期', type: 'date', sortable: 'sortable' },
        { prop: 'name', label: '姓名', type: 'input' },
        { prop: 'address', label: '地址', type: 'text' },
        { prop: 'select', label: '选项', type: 'sel' }
      ],
      editable: []
    }
  },
  methods: {
    // 删除线
    delleteRow (row) {
      if (row.isSet) {
        alert('有未保存的内容，请先保存！')
        return false
      }
      this.$set(row, 'flag', 'del')
    },
    // 添加行
    addCol () {
      this.tableData.push({
        date: '2016-05-03',
        name: 'hhahahah',
        address: '上海市普陀区金沙江路 1516 弄',
        flag: 'add'
      })
    },
    // 编辑
    edit (oldVal, name, index, event) {
      let $key = '_' + oldVal
      if (this.tableData[index].hasOwnProperty($key)) {
        event.target.parentElement.previousElementSibling.style.display = 'block'
      } else {
        this.tableData[index]['_' + oldVal] = name
      }
    },
    leave (oldVal, index, event) {
      let $key = '_' + oldVal
      if (this.tableData[index].hasOwnProperty($key)) {
        event.target.parentElement.previousElementSibling.style.display = 'block'
      }
    },
    changeNum (row, index) {
      // this.$set(this.editable,index,true)
      if (row.isSet) {
        this.$set(row, 'isSet', false)
        // row.isSet = false
      } else {
        this.$set(row, 'isSet', true)
        // row.isSet = true
      }
    },
    // 更换时间
    dateChange (date, index) {
      let d = new Date(date)
      let val = d.getFullYear() + '-' + (d.getMonth() + 1 > 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 10 ? d.getDate() : '0' + d.getDate()) + ' ' + (d.getHours() > 10 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() > 10 ? d.getMinutes() : '0' + d.getMinutes()) + ':' + (d.getSeconds() > 10 ? d.getSeconds() : '0' + d.getSeconds())
      if (!this.tableData[index].hasOwnProperty('oldDate')) {
        this.tableData[index]['oldDate'] = val
      }
    },
    // 切换下拉框
    changeSel (oldSel, index) {
      if (!this.tableData[index].hasOwnProperty('oldSel')) {
        this.tableData[index]['oldSel'] = oldSel
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.el-icon-circle-plus {
  color: red;
}
.addBtn {
  float: left;
}
.save-span{
  color:gray;
  text-decoration:line-through;
  display:block;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
/deep/ .addline{
  position: relative !important;
}
/deep/ .el-table_row .addline::after{
  content:'';
  position:absolute;
  height:3px;
  top:50%;
  left:0;
  right:0;
  bottom:0;
  text-decoration:line-through;
  color:graytext;
  background:blue;
}
</style>
