<template>
  <section class="user-profile-page">
    <div class="user-profile-page-upper container">
      <section class="user-profile-box-container">
        <section class="user-profile-box">
          <div v-if="userDetails" class="userImgContiner">
            <img v-if="userDetails.img" class="user-img" :src="userDetails.img" />
            <img
              v-if="!userDetails.img"
              class="user-img"
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
            />
          </div>
          <div class="profileSect">
            <img class="profileIcon" src="../assets/imgs/star.png" />
            <div class="reviews-number-txt">59 reviews</div>
          </div>
          <div class="profileSect">
            <img class="profileIcon" src="../assets/imgs/v.png" />
            <div class="reviews-verified-txt">Verified</div>
          </div>
          <div class="profileSect">
            <img class="profileIcon" src="../assets/imgs/governmentId.png" />
            <div class="reviews-verified-txt">Government ID</div>
          </div>
          <div class="profileSect">
            <img class="profileIcon" src="../assets/imgs/selfie.png" />
            <div class="reviews-verified-txt">Selfie</div>
          </div>
          <div class="profileSect">
            <img class="profileIcon" src="../assets/imgs/email.jpg" />
            <div class="reviews-verified-txt">Email address</div>
          </div>
          <!-- <div class="profileSect">
            <img class="profileIcon" src="../assets/imgs/phone.png" />
            <div class="reviews-checked-txt">Phone number</div>
          </div>-->
        </section>
      </section>

      <div class="user-profile-page-right flex flex-column align-center">
        <section class="page-right-box">
          <div v-if="userDetails" class="welcome-txt">Hi, I'm {{userDetails.username}}</div>
          <div class="joined-year">Joined in 2018,</div>
          <div class="description-txt">
            Well I'll be very happy if you stop searching any further and stay
            with me for a safe and care free vacation!
            30 year old programmer and musician.
            I'm passionate about hosting and making your trip here enjoyable,
            using my own experience and knowledge of the never-sleeping city!
          </div>
        </section>
      </div>
    </div>

    <div>
      <div class="host-houses-wrapper container">
        <div class="my-places-txt">My places</div>
        <section class="host-houses-container">
          <router-link
            :to="`/house/details/house/${house._id}`"
            class="host-houses-list"
            v-for="(house,idx) in hostHouses.items"
            :key="idx"
          >
            <img class="host-house-img" :src="house.imgs[0]" />
            <section class="host-houses-list-txts">
              <section class="withoutRating">
                <li
                  class="location profile-item"
                >{{house.location.address.city}}, {{house.location.address.country}}</li>
                <p class="profile-item-house-name">{{house.name}}</p>
                <li class="price profile-item">USD {{house.price}} / night</li>
              </section>
              <div class="rating">
                <img src="../assets/imgs/coloredStar.png" />
                <div>{{house.reviews.avgRating}}</div>
              </div>
            </section>
          </router-link>
        </section>
      </div>

      <section class="profile-orders-container container">
        <div class="my-places-txt">{{msg}}</div>
        <order-list class="profile-orders-list" :isHost="isHost"></order-list>
        <button v-if="!showBtn" class="changeToHostModeBtn" @click="orderReq">Show orders request</button>
        <button v-if="showBtn" class="changeToHostModeBtn" @click="orders">Show my vacations</button>
      </section>
    </div>
    <img
      class="bgi"
      src="https://images.squarespace-cdn.com/content/v1/55390e8ee4b05abbe6eb0e43/1555078265582-0ITPX0SXCA6ALF0N2Q2C/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/3303+River+Road_2019CHT_Furmansky_Print_448.jpg?format=1000w"
    />
  </section>
</template>

<script>
import orderList from "../components/OrderList";
import reviewList from "../components/ReviewList";

export default {
  data() {
    return {
      criteria: {
        id: "",
        query: ""
      },
      msg: "",
      isHost: false,
      userDetails: null,
      showBtn: false
    };
  },

  computed: {
    hostHouses() {
      return this.$store.getters.hostHouses;
    }
  },

  methods: {
    async orderReq() {
      this.showBtn = true;
      this.criteria.query = "ordersReq";
      this.isHost = true;
      await this.$store.dispatch("loadOrders", this.criteria);
      this.msg = "Orders to my places";
    },
    async orders() {
      this.showBtn = false;
      this.criteria.id = this.userDetails._id;
      this.criteria.query = "ordersList";
      this.msg = "My Vacations";
      await this.$store.dispatch("loadOrders", this.criteria);
    }
  },

  async created() {
    window.scrollTo(0, 0);
    this.userDetails = await this.$store.getters.loggedinUser;
    this.orders();
    await this.$store.dispatch("loadHostHouses", this.criteria.id);
  },

  components: {
    orderList,
    reviewList
  }
};
</script>