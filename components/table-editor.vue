<template>
    <div style="padding:10px;">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <td v-for="col in tableData.cols">
                        <input type="text" class="form-control" v-model="col.name">
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-primary" @click="addColumn()"><i class="fa fa-plus"></i></button>
                            <button class="btn btn-primary" @click="addRow()"><i class="fa fa-plus"></i></button>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index, row) in tableData.rows">
                    <td v-for="(i, cols) in tableData.cols">
                        <input class="form-control" type="text" v-model="row[i]">
                    </td>
                    <td>
                        <button class="btn btn-danger btn-xs" @click='removeRow(index)'><i class="fa fa-minus"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class='form-group'>
            <mdl-button raised colored v-mdl-ripple-effect @click="showPaste=!showPaste"><i class="fa fa-paste"></i> Paste from Spreadsheet</mdl-button>
            <div style="margin-top:5px;"></div>
            <textarea v-show="showPaste" v-model="pastedData" class="form-control" @paste="handlePaste() | debounce 1" ></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                tableData: {cols:[{name:''},{name:''},{name:''}], rows:[]},
                showPaste: false,
                pastedData: ''
            }
        },
        methods: {
            addColumn: function() {
                if(!('cols' in this.tableData)) this.tableData.cols = [];

                this.tableData.cols.push({name: ''});
            },
            addRow: function() {
                if(!('rows' in this.tableData)) this.tableData.rows = [];
                var row = [];
                for(var i = 0; i < this.tableData.cols.length; i++) {
                    row.push('');
                }
                this.tableData.rows.push(row);
            },
            removeRow: function(index) {
                this.tableData.rows.splice(index, 1);
            },
            handlePaste: function() {
                var rows = this.pastedData.split('\n');
                var data = [], j;
                for (var i = 0; i < rows.length; i++) {
                    data.push(rows[i].split('\t'));
                }
                
                this.tableData.cols = [];
                this.tableData.rows = [];
                if (data.length > 0) {
                    for (i = 0; i < data[0].length; i++) {
                        this.tableData.cols.push({
                            name: data[0][i]
                        });
                    }
                    for (i = 1; i < data.length; i++) {
                        var rows = [];
                        for (j = 0; j < data[i].length; j++) {
                            rows.push(data[i][j]);
                        }
                        this.tableData.rows.push(rows);
                    }
                }
                this.showPaste = false;
                this.pastedData = '';
            }
        }
    }
</script>