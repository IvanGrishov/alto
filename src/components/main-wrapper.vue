<template>
    <div class="main-wrapper">
        <section class="section-card-product cards">
            <div class="cards__container container">
                <div class="cards__row">
                    <a href="#"
                       class="card-product"
                       v-for="product in products"
                       :key="product.id"
                    >
                        <div class="card-product__inner">
                            <div class="card-product__img-wrapper">
                                <img :src="product.image_url" alt="">
                            </div>
                            <div class="card-product__content">
                                <div class="card-product__status"
                                     :class="{'card-product__status--availability': product.availability = 1, 'card-product__status-on-order': product.availability = 0}"
                                >{{ product.availability = 1 ? in_stock : on_order }}
                                </div>
                                <h5 class="card-product__name">{{ product.name }}</h5>
                                <div class="card-product__price">{{ product.price.toLocaleString() }} ₽</div>
                                <div class="card-product__hide-content">
                                    <h6 class="card-product__color">Цвет - {{ product.color }}</h6>
                                    <h6 class="card-product__description">{{ product.short_desc }}</h6>
                                    <button class="card-product__button-in-cart">
                                        <svg>
                                            <use xlink:href="../assets/images/sprite.svg#icon-cart"></use>
                                        </svg>
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="cards__pagination">
                    <v-pagination
                        v-model="current_page"
                        :pages="pages"
                        :range-size="1"
                        active-color="#DCEDFF"
                        @update:modelValue="updateHandler"
                        :hideFirstButton="true"
                        :hideLastButton="true"
                        @click="addedClassPagination"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
    name: 'main-wrapper',
    data() {
        return {
            in_stock: 'В наличии',
            on_order: 'Под заказ',
            current_page: 1,
            pages: 2,
        }
    },
    components: {
        VPagination
    },
    computed: {
        ...mapState([
            'products',
            'total_count',
        ])
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API'
        ]),
        updateHandler() {
            this.GET_PRODUCTS_FROM_API(this.current_page)
        },
        addedClassPagination() {
            let buttons_active = document.querySelectorAll('.Control');
            buttons_active.forEach(item => {
                if (item.classList.contains('Control-active')) {
                    item.closest('li').classList.add('button--active')
                } else {
                    item.closest('li').classList.remove('button--active')
                }
            })

        }
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API(this.current_page)
        .then(() => {
            this.pages = Math.ceil(this.total_count / 4);
        })
        this.addedClassPagination()
    }
}
</script>


<style lang="scss">
    .PaginationControl.button--active {
        transition: 0.2s ease-out;
        &:hover {
            &::before {
                background-color: var(--blue-color) !important;
                color: var(--white-color) !important;
            }
        }
    }
    .cards__pagination {
        margin-top: 145px;
        display: flex;
        justify-content: center;
    }
    .Page {
        width: 32px;
        height: 32px;
        background-color: #EFF5FE !important;
        color: var(--dark-color);
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        border-radius: 100%;
        border: none;
    }
    .Page-active {
        background-color: #336EC6 !important;
        color: var(--white-color) !important;
    }
    .PaginationControl {
        position: relative;
        &:first-child {
            margin-right: 18px;
            &::before {
                content: "Назад";
                position: absolute;
                color: #9FAABA;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 15px;
                right: 0;
                top: 0;
                background: #EFF5FE;
                border-radius: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 8px 18px 10px;
                transition: 0.2s ease-out;
            }
        }
        &:last-child {
            margin-left: 18px;
            &::before {
                content: "Вперед";
                position: absolute;
                color: #9FAABA;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 15px;
                right: 0;
                top: 0;
                background: #EFF5FE;
                border-radius: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 8px 18px 10px;
                transition: 0.2s ease-out;
            }
        }

        &.button--active::before {
            color: #4F545F;
        }
        .Control {
            width: 74px;
            height: 32px;
            path {
                opacity: 0;
            }
        }
    }
</style>
