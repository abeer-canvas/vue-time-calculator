<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-outline-secondary"
    data-toggle="modal"
    data-target="#exampleModal2"
  >
    <i class="fas fa-question"></i> How This Works
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">How This Works</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-left">
          <!-- Start -->
          <p>{{ manualMessage }}</p>

          For time-blocks:
          <img class="w-100" src="../assets/pic-1.png" />
          <br />
          <br />
          For Bulk-input Average:
          <img class="w-100" src="../assets/pic-2.png" />
          <!-- Ending -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["manualMessage"]),
  },
};
</script>