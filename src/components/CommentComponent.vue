<template>
  <div>
    <div class="comment-session">
      <h3>Comment</h3>

      <div class="comments-list">
        <div v-if="comments.length === 0">There are no comments yet.</div>

        <div v-for="comment in comments " :key="comment.data._id" class="post-comment">
          <div class="list">
            <div class="user">
              <q-avatar>
                <img src="https://cdn-images.vtv.vn/thumb_w/660/562122370168008704/2023/5/28/330354360516055093936218452139591474979619n-16852925140791621923371.jpg">
              </q-avatar>
              <div class="user-meta">
                <div class="name">Hieu</div>
                <div class="day">{{ new Date(comment.data.created_by_date).toLocaleDateString() }}</div>
              </div>
            </div>
            <div class="comment-post">
              <span v-if="!isEditing[comment.data._id]" style="padding: 20px">{{ comment.data.content }}</span>
              <div class="comment-updated">

                <q-input v-if="isEditing[comment.data._id] " v-model="editContent[comment.data._id]"  placeholder="Edit comments..."  type="text" :dense="dense" />
                <q-btn v-if="isEditing[comment.data._id]"
                       @click="updateComment(comment.data._id)"

                       label="Confirm correction"></q-btn>
              </div>
              <q-btn  label=" " style="display: inline; position: absolute; top: 0; right: 30px;">
                <i class="fa-solid fa-gear" style="color:#fff;"></i>
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="toggleEdit(comment.data._id)">
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-separator/>
                    <q-item clickable v-close-popup @click="confirmDelete(comment.data._id)">
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
            <img src="https://cdn-images.vtv.vn/thumb_w/660/562122370168008704/2023/5/28/330354360516055093936218452139591474979619n-16852925140791621923371.jpg">
          </q-avatar>
          <div class="name">Hieu</div>
        </div>
        <textarea v-model="comment" cols="30" rows="10" placeholder="Enter your comment..."></textarea>
        <q-btn @click="submitComment"  label="Submit a comment"></q-btn>
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
      comments: [], // Danh sách bình luận
      isEditing: {}, // Để theo dõi bình luận nào đang ở chế độ sửa
      editContent: {} // Nội dung đang sửa
    }
  },
  methods: {
    async fetchComments(postId) {
      try {
        const response = await axios.get(`https://apidev.hitc.vn/mocommentapithuctap/api/comments/get-paging/${postId}`);
        this.comments = response.data.comments || [];  // Đảm bảo comments là một mảng
        console.log('Fetched comments:', this.comments); // Ghi ra để kiểm tra
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
      }
    },
    async submitComment() {
      try {
        const response = await axios.post('https://apidev.hitc.vn/mocommentapithuctap/api/comments/create', {
          content: this.comment
        });

        console.log('Bình luận đã được gửi:', response.data);
        this.comments.push(response.data); // Thêm bình luận mới vào danh sách
        this.comment = ''; // Xóa nội dung bình luận
      } catch (error) {
        console.error('Lỗi khi gửi bình luận:', error);
      }
    },
    toggleEdit(commentId) {
      // Chuyển đổi giữa chế độ sửa và không sửa
      this.isEditing[commentId] = !this.isEditing[commentId];
      if (this.isEditing[commentId]) {
        // Nếu đang sửa, sao chép nội dung bình luận vào editContent
        this.editContent[commentId] = this.comments.find(c => c.data._id === commentId).data.content;
      }
    },
    async updateComment(commentId) {
      try {
        const response = await axios.put(`https://apidev.hitc.vn/mocommentapithuctap/api/comments/update/${commentId}`, {
          content: this.editContent[commentId] // Chỉ gửi nội dung bình luận
        });

        console.log('Bình luận đã được cập nhật:', response.data);
        // Cập nhật danh sách bình luận
        const updatedCommentIndex = this.comments.findIndex(c => c.data._id === commentId);
        if (updatedCommentIndex !== -1) {
          this.comments[updatedCommentIndex].data.content = this.editContent[commentId];
        }
        this.isEditing[commentId] = false; // Đóng chế độ sửa
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
        const response = await axios.delete(`https://apidev.hitc.vn/mocommentapithuctap/api/comments/delete/${commentId}`);
        console.log('Bình luận đã được xóa:', response.data);
        this.comments = this.comments.filter(c => c.data._id !== commentId); // Xóa bình luận khỏi danh sách
      } catch (error) {
        console.error('Lỗi khi xóa bình luận:', error);
      }
    }
  },
  mounted() {
    const postId = 1; // Thay bằng ID bài viết thực tế
    this.fetchComments(postId); // Gọi hàm để lấy bình luận khi component được khởi tạo
  }
}
</script>


<style src="src/css/comment.css"></style>
