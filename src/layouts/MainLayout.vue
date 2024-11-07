<template>
  <div>
    <h1>Master App</h1>
    <div >
      <component :is="commentModule" />
<!--      Sử dụng Vue dynamic component, với thuộc tính :is trỏ đến commentModule. Vue sẽ hiển thị component mà commentModule chỉ tới. Điều này cho phép bạn hiển thị một component tùy thuộc vào giá trị của commentModule.-->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
// Import defineAsyncComponent từ Vue. Hàm này cho phép định nghĩa một component dưới dạng tải bất đồng bộ (async), tức là component chỉ được tải khi cần sử dụng, giúp giảm tải lúc ban đầu và cải thiện hiệu năng.
export default {
  data() {
    return {
      commentModule: defineAsyncComponent(() =>
        import('commentApp/VueAppLoader')
      // cú pháp dynamic import, yêu cầu Webpack tìm VueAppLoader trong ứng dụng con commentApp, đã được định nghĩa trong Webpack config của masterApp.
      ),
    };
  },
};
</script>
<style>
.comments-list{
  width: 100vh;
  height: 50vh;
  overflow: auto;
  background: blueviolet;
  margin: 50px 0;
}
</style>
