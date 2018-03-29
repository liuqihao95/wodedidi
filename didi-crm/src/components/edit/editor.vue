<template>
    <div id="editor">

    </div>
</template>

<script>
    import WangEditor from 'wangeditor'

    export default {
        name: "editor",
        props: {
            value: {
                type: String
            }
        },
        data() {
            return {
                editor: null,
                DataValue: ''
            }
        },
        created() {
            let that=this;
            this.$nextTick(() => {
                this.editor = new WangEditor('#editor');
                // 或者 var editor = new E( document.getElementById('editor') )

                this.editor.customConfig.onchange = function (html) {
                    // html 即变化之后的内容
                    that.$emit('input',html);
                    that.$emit('getText',that.editor.txt.text())
                };
                this.editor.create();

                document.getElementById('editor').addEventListener('keyup', function () {
                    // 如果未配置 editor.customConfig.onchange，则 editor.change 为 undefined
                    that.editor.change && that.editor.change()
                })

            })
        },
        watch: {
            value(val) {
                this.DataValue=val;
               this. editor.txt.html(val)
            }
        }
    }
</script>

<style scoped>

</style>