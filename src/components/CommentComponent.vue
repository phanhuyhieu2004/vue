<template>
  <div>
    <div class="comment-session">
      <h3>Bình luận</h3>

      <div class="post-comment">
        <div class="list">
          <div class="user">
            <q-avatar color="red" text-color="white" icon="directions"/>
            <div class="user-meta">
              <div class="name">Hieu</div>
              <div class="day">4/11/2024</div>
            </div>
          </div>
          <div class="comment-post">
            <input hidden="hidden" type="text"/>
            Hello world
            <q-btn color="primary" label=" " style="display: inline; position: absolute; top: 0; right: 30px;">
              <i class="fa-solid fa-gear" style="color:#fff;"></i>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Sửa</q-item-section>
                  </q-item>
                  <q-separator/>
                  <q-item clickable v-close-popup>
                    <q-item-section>Xóa</q-item-section>
                  </q-item>
                  <q-separator/>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="comment-box">
        <div class="user">
          <q-avatar color="red" text-color="white" icon="directions"/>
          <div class="name">Hieu</div>
        </div>
        <textarea v-model="comment" cols="30" rows="10" placeholder="Nhập bình luận của bạn..."></textarea>
        <q-btn @click="submitComment" color="primary" label="Gửi bình luận"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CommentComponent',
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    async submitComment() {
      try {
        const response = await axios.post('https://apidev.hitc.vn/mocommentapithuctap/api/comments/create', {
          content: this.comment
        });

        console.log('Bình luận đã được gửi:', response.data);
        this.comment = '';
      } catch (error) {
        console.error('Lỗi khi gửi bình luận:', error);
      }
    }
  },
  beforeMount() {
    console.log('sadfsdf', this)
  }
}
</script>

<style src="src/css/comment.css"></style>
