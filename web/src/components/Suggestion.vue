<template>
  <div>
    <a-config-provider :auto-insert-space-in-button="false">
      <a-button @click="info" type="link">
        建议
      </a-button>
    </a-config-provider>
  </div>
</template>
<script>
export default {
  name: 'Suggestion',
  methods: {
    info() {
      this.$info({
        title: '提交建议',
        width: 900,
        content: (
            <div>
              <iframe src='https://www.wjx.cn/vj/QPaihGI.aspx?width=760&source=iframe&s=t'
                      width='800'
                      height='400'
                      frameBorder='0'
                      style='overflow:auto'
              >
              </iframe>
            </div>
        ),
        onOk() {},
      });
    },
  },
};
</script>
