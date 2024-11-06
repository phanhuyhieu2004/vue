<template>
  <div>
    <div class="comment-session">
      <h3>Comment App</h3>

      <div class="comments-list">
        <div v-if="comments.length === 0">There are no comments yet.</div>

        <div v-for="comment in comments" :key="comment._id" class="post-comment">
          <div class="list">
            <div class="user">
              <q-avatar>
                <img
                  src="https://cdn-images.vtv.vn/thumb_w/660/562122370168008704/2023/5/28/330354360516055093936218452139591474979619n-16852925140791621923371.jpg">
              </q-avatar>
              <div class="user-meta">
                <div class="name">Hieu</div>
                <div class="day">{{ new Date(comment.created_by_date).toLocaleDateString() }}</div>
              </div>
            </div>
            <div class="comment-post">
              <span v-if="!isEditing[comment._id]" style="padding: 20px">{{ comment.content }}</span>
              <div class="comment-updated">
                <q-input v-if="isEditing[comment._id]" v-model="editContent[comment._id]"
                         type="text" :dense="dense"/>
                <q-btn v-if="isEditing[comment._id]" @click="updateComment(comment._id)"
                       label="Confirm correction"></q-btn>
              </div>
              <q-btn label=" " style="display: inline; position: absolute; top: 0; right: 30px;">
                <i class="fa-solid fa-gear" style="color:#fff;"></i>
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="toggleEdit(comment._id)">
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-separator/>
                    <q-item clickable v-close-popup @click="confirmDelete(comment._id)">
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                    <q-separator/>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="comment-box">
        <div class="user">
          <q-avatar>
            <img
              src="https://cdn-images.vtv.vn/thumb_w/660/562122370168008704/2023/5/28/330354360516055093936218452139591474979619n-16852925140791621923371.jpg">
          </q-avatar>
          <div class="name">Hieu</div>
        </div>
        <textarea v-model="comment" cols="30" rows="10" placeholder="Enter your comment..."></textarea>
        <q-btn @click="submitComment()" label="Submit a comment"></q-btn>
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
      comment: '',
      comments: [],
      isEditing: {},
      editContent: {},
      post_id: '1'
    }
  },
  methods: {
    async fetchComments() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://apidev.hitc.vn/mocommentapithuctap/api/comments/get-paging/${this.post_id}?sort=0`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.comments = response.data.data.sort((a, b) => new Date(b.created_by_date) - new Date(a.created_by_date));
        console.log('bình luận :', this.comments);
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
      }
    },

    async submitComment() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://apidev.hitc.vn/mocommentapithuctap/api/comments/create', {
          content: this.comment,
          post_id: this.post_id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Bình luận đã được gửi:', response.data.data);
        this.comments.unshift(response.data.data);
        this.comment = '';
      } catch (error) {
        console.error('Lỗi khi gửi bình luận:', error);
      }
    },

    toggleEdit(commentId) {
      this.isEditing[commentId] = !this.isEditing[commentId];
      if (this.isEditing[commentId]) {
        this.editContent[commentId] = this.comments.find(c => c._id === commentId).content;
      }
      console.log("trạng thái edit", this.isEditing);
    },

    async updateComment(commentId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://apidev.hitc.vn/mocommentapithuctap/api/comments/update/${commentId}`, {
          content: this.editContent[commentId],

        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Bình luận đã được cập nhật:', response.data);

        const updatedCommentIndex = this.comments.findIndex(c => c._id === commentId);
        if (updatedCommentIndex !== -1) {
          this.comments[updatedCommentIndex].content = this.editContent[commentId];
        }
        this.isEditing[commentId] = false;
      } catch (error) {
        console.error('Lỗi khi cập nhật bình luận:', error);
      }
    },

    confirmDelete(commentId) {
      if (confirm('Are you sure you want to delete this comment?')) {
        this.deleteComment(commentId);
      }
    },

    async deleteComment(commentId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://apidev.hitc.vn/mocommentapithuctap/api/comments/delete/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Bình luận đã được xóa:', response.data);
        this.comments = this.comments.filter(c => c._id !== commentId);
      } catch (error) {
        console.error('Lỗi khi xóa bình luận:', error);
      }
    }
  },

  mounted() {
    this.fetchComments();
  }
}
</script>

<style src="src/css/comment.css"></style>
