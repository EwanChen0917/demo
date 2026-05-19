<template>
  <el-dialog
    v-model="visible"
    append-to-body
    align-center
    :show-close="false"
    :fullscreen="isFullscreen"
    :width="1200"
    id="ai-report-dialog"
  >
    <template #header>
      <div
        class="ai-report-header"
        :class="{ sticky: isSticky || editPermission, editable: editPermission }"
      >
        <div class="left">
          <template v-if="editPermission">
            <div class="report-title">
              <span>
                {{ originalData?.reportTitle || 'AI经营分析报告' }}｜{{ currentWeekLabel }}
              </span>
            </div>
            <div class="update-info" v-if="originalData?.updater">
              <el-image
                style="width: 16px; height: 16px; border-radius: 50%"
                :src="originalData?.updaterAvatar"
                fit="contain"
              >
                <template #error>
                  <img src="@/assets/images/system/empty.png" alt="" />
                </template>
              </el-image>
              <span>{{ originalData?.updaterTitle }} - {{ originalData?.updaterName }} 编辑</span>
              <i class="iconfont icon-shijian"></i>
              <span>
                最近编辑时间：{{ dayjs(originalData?.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
              </span>
            </div>
          </template>
          <template v-else>
            <div class="report-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <g clip-path="url(#clip0_21259_6217)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.9998 4.89453C19.0284 4.89453 23.105 8.97203 23.105 14.0007C23.105 19.0293 19.0284 23.1059 13.9998 23.1059H7.68316C6.94364 23.1057 6.23448 22.8118 5.71156 22.2889C5.18864 21.766 4.89476 21.0568 4.89453 20.3173V13.9998C4.89453 8.97203 8.97116 4.89628 13.9998 4.89628V4.89453ZM11.6872 9.67903C11.5628 9.64335 11.4327 9.63251 11.3042 9.64716C11.1757 9.6618 11.0513 9.70162 10.9382 9.76436C10.825 9.82709 10.7254 9.9115 10.6449 10.0128C10.5645 10.114 10.5047 10.2302 10.4692 10.3545L8.45316 17.3895C8.39321 17.5987 8.4188 17.8232 8.52431 18.0135C8.62982 18.2039 8.8066 18.3445 9.01578 18.4045L9.03853 18.4107C9.24541 18.4636 9.46477 18.4338 9.65003 18.3276C9.83529 18.2214 9.97188 18.0472 10.0308 17.8419L10.3152 16.8479H12.5167L12.801 17.8419C12.8307 17.9454 12.8805 18.0421 12.9476 18.1264C13.0147 18.2107 13.0977 18.2809 13.1919 18.3331C13.2861 18.3853 13.3897 18.4185 13.4967 18.4306C13.6037 18.4428 13.7121 18.4338 13.8156 18.4041C13.9191 18.3744 14.0158 18.3246 14.1001 18.2575C14.1844 18.1905 14.2546 18.1075 14.3068 18.0132C14.359 17.919 14.3922 17.8155 14.4043 17.7084C14.4165 17.6014 14.4075 17.4931 14.3778 17.3895L12.3618 10.3545C12.3159 10.194 12.2299 10.0477 12.1118 9.92952C11.9938 9.81135 11.8477 9.72515 11.6872 9.67903ZM17.6914 9.65366H16.0508C15.9431 9.65366 15.8364 9.67487 15.7369 9.7161C15.6373 9.75732 15.5469 9.81775 15.4707 9.89392C15.3946 9.97009 15.3341 10.0605 15.2929 10.16C15.2517 10.2596 15.2305 10.3662 15.2305 10.474C15.2305 10.5817 15.2517 10.6884 15.2929 10.7879C15.3341 10.8874 15.3946 10.9778 15.4707 11.054C15.5469 11.1302 15.6373 11.1906 15.7369 11.2318C15.8364 11.2731 15.9431 11.2943 16.0508 11.2943H16.0919V16.7902H16.0508C15.8332 16.7902 15.6246 16.8766 15.4707 17.0304C15.3169 17.1843 15.2305 17.3929 15.2305 17.6105C15.2305 17.828 15.3169 18.0367 15.4707 18.1905C15.6246 18.3444 15.8332 18.4308 16.0508 18.4308H17.6914C17.9035 18.4275 18.106 18.3423 18.2566 18.193C18.4072 18.0437 18.4942 17.8418 18.4992 17.6298C18.5043 17.4178 18.4272 17.2121 18.2839 17.0557C18.1407 16.8993 17.9424 16.8045 17.7308 16.791L17.7325 16.749V11.2925C17.9443 11.279 18.1425 11.184 18.2857 11.0274C18.4289 10.8709 18.506 10.665 18.5006 10.4529C18.4953 10.2408 18.4081 10.039 18.2572 9.88981C18.1063 9.74064 17.9036 9.65656 17.6914 9.65366ZM11.4159 13.0084L12.0459 15.209H10.7859L11.4159 13.0084Z"
                    fill="url(#paint0_linear_21259_6217)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.1123 7.58874C17.9217 7.69374 18.6261 8.03499 19.2237 8.60987C19.8153 9.1729 20.2137 9.90853 20.3621 10.7116L22.6309 11.0984C22.0202 9.53387 21.4234 8.51712 20.8389 8.04549C20.2553 7.57562 19.0137 7.42337 17.1123 7.58874Z"
                    fill="url(#paint1_linear_21259_6217)"
                  />
                  <path
                    d="M20.4309 4.06525C20.4702 4.07664 20.5059 4.09766 20.535 4.12639C20.564 4.15512 20.5854 4.19065 20.5972 4.22975L20.8133 4.96125C20.952 5.42765 21.2049 5.85209 21.5489 6.19615C21.893 6.54022 22.3174 6.79305 22.7838 6.93176L23.5153 7.14876C23.5657 7.16399 23.6098 7.19501 23.6411 7.23724C23.6724 7.27947 23.6894 7.33067 23.6894 7.38326C23.6894 7.43585 23.6724 7.48704 23.6411 7.52927C23.6098 7.5715 23.5657 7.60252 23.5153 7.61776L22.7838 7.83476C22.3174 7.97346 21.893 8.22629 21.5489 8.57036C21.2049 8.91442 20.952 9.33886 20.8133 9.80526L20.5963 10.5359C20.5809 10.5859 20.5498 10.6296 20.5077 10.6607C20.4656 10.6917 20.4146 10.7085 20.3623 10.7085C20.3099 10.7085 20.259 10.6917 20.2168 10.6607C20.1747 10.6296 20.1437 10.5859 20.1282 10.5359L19.9103 9.80526C19.7716 9.33886 19.5188 8.91442 19.1747 8.57036C18.8307 8.22629 18.4062 7.97346 17.9398 7.83476L17.2092 7.61776C17.1589 7.60252 17.1148 7.5715 17.0834 7.52927C17.0521 7.48704 17.0352 7.43585 17.0352 7.38326C17.0352 7.33067 17.0521 7.27947 17.0834 7.23724C17.1148 7.19501 17.1589 7.16399 17.2092 7.14876L17.9398 6.93176C18.4062 6.79305 18.8307 6.54022 19.1747 6.19615C19.5188 5.85209 19.7716 5.42765 19.9103 4.96125L20.1282 4.22975C20.1468 4.1678 20.1892 4.11574 20.2461 4.08492C20.303 4.0541 20.3689 4.04703 20.4309 4.06525ZM23.9983 1.92063C24.0172 1.92623 24.0343 1.93644 24.0482 1.95034C24.0621 1.96425 24.0724 1.9814 24.0779 2.00025L24.183 2.35463C24.2502 2.58068 24.3728 2.78637 24.5397 2.95306C24.7065 3.11976 24.9123 3.24218 25.1384 3.30925L25.492 3.41425C25.5168 3.42121 25.5386 3.43608 25.5542 3.45662C25.5698 3.47716 25.5782 3.50223 25.5782 3.528C25.5782 3.55378 25.5698 3.57885 25.5542 3.59939C25.5386 3.61993 25.5168 3.6348 25.492 3.64175L25.1384 3.74675C24.9125 3.81395 24.7069 3.93643 24.5402 4.10312C24.3735 4.26981 24.251 4.47543 24.1838 4.70138L24.0788 5.05575C24.0719 5.08058 24.057 5.10244 24.0365 5.11802C24.0159 5.1336 23.9909 5.14203 23.9651 5.14203C23.9393 5.14203 23.9142 5.1336 23.8937 5.11802C23.8732 5.10244 23.8583 5.08058 23.8513 5.05575L23.7463 4.70138C23.679 4.47559 23.5565 4.27015 23.3898 4.10362C23.2231 3.9371 23.0175 3.81474 22.7917 3.74763L22.4373 3.64175C22.4125 3.6348 22.3906 3.61993 22.3751 3.59939C22.3595 3.57885 22.3511 3.55378 22.3511 3.528C22.3511 3.50223 22.3595 3.47716 22.3751 3.45662C22.3906 3.43608 22.4125 3.42121 22.4373 3.41425L22.7917 3.30925C23.0174 3.24202 23.2228 3.11961 23.3893 2.95309C23.5558 2.78657 23.6782 2.58119 23.7455 2.3555L23.8504 2.00025C23.8549 1.98525 23.8624 1.97129 23.8723 1.95918C23.8823 1.94708 23.8945 1.93707 23.9083 1.92974C23.9222 1.92242 23.9373 1.91791 23.9529 1.9165C23.9685 1.91508 23.9843 1.91679 23.9992 1.9215L23.9983 1.92063Z"
                    fill="#F5DA80"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.9998 4.89453C19.0284 4.89453 23.105 8.97203 23.105 14.0007C23.105 19.0293 19.0284 23.1059 13.9998 23.1059H7.68316C6.94364 23.1057 6.23448 22.8118 5.71156 22.2889C5.18864 21.766 4.89476 21.0568 4.89453 20.3173V13.9998C4.89453 8.97203 8.97116 4.89628 13.9998 4.89628V4.89453ZM11.6872 9.67903C11.5628 9.64335 11.4327 9.63251 11.3042 9.64716C11.1757 9.6618 11.0513 9.70162 10.9382 9.76436C10.825 9.82709 10.7254 9.9115 10.6449 10.0128C10.5645 10.114 10.5047 10.2302 10.4692 10.3545L8.45316 17.3895C8.39321 17.5987 8.4188 17.8232 8.52431 18.0135C8.62982 18.2039 8.8066 18.3445 9.01578 18.4045L9.03853 18.4107C9.24541 18.4636 9.46477 18.4338 9.65003 18.3276C9.83529 18.2214 9.97188 18.0472 10.0308 17.8419L10.3152 16.8479H12.5167L12.801 17.8419C12.8307 17.9454 12.8805 18.0421 12.9476 18.1264C13.0147 18.2107 13.0977 18.2809 13.1919 18.3331C13.2861 18.3853 13.3897 18.4185 13.4967 18.4306C13.6037 18.4428 13.7121 18.4338 13.8156 18.4041C13.9191 18.3744 14.0158 18.3246 14.1001 18.2575C14.1844 18.1905 14.2546 18.1075 14.3068 18.0132C14.359 17.919 14.3922 17.8155 14.4043 17.7084C14.4165 17.6014 14.4075 17.4931 14.3778 17.3895L12.3618 10.3545C12.3159 10.194 12.2299 10.0477 12.1118 9.92952C11.9938 9.81135 11.8477 9.72515 11.6872 9.67903ZM17.6914 9.65366H16.0508C15.9431 9.65366 15.8364 9.67487 15.7369 9.7161C15.6373 9.75732 15.5469 9.81775 15.4707 9.89392C15.3946 9.97009 15.3341 10.0605 15.2929 10.16C15.2517 10.2596 15.2305 10.3662 15.2305 10.474C15.2305 10.5817 15.2517 10.6884 15.2929 10.7879C15.3341 10.8874 15.3946 10.9778 15.4707 11.054C15.5469 11.1302 15.6373 11.1906 15.7369 11.2318C15.8364 11.2731 15.9431 11.2943 16.0508 11.2943H16.0919V16.7902H16.0508C15.8332 16.7902 15.6246 16.8766 15.4707 17.0304C15.3169 17.1843 15.2305 17.3929 15.2305 17.6105C15.2305 17.828 15.3169 18.0367 15.4707 18.1905C15.6246 18.3444 15.8332 18.4308 16.0508 18.4308H17.6914C17.9035 18.4275 18.106 18.3423 18.2566 18.193C18.4072 18.0437 18.4942 17.8418 18.4992 17.6298C18.5043 17.4178 18.4272 17.2121 18.2839 17.0557C18.1407 16.8993 17.9424 16.8045 17.7308 16.791L17.7325 16.749V11.2925C17.9443 11.279 18.1425 11.184 18.2857 11.0274C18.4289 10.8709 18.506 10.665 18.5006 10.4529C18.4953 10.2408 18.4081 10.039 18.2572 9.88981C18.1063 9.74064 17.9036 9.65656 17.6914 9.65366ZM11.4159 13.0084L12.0459 15.209H10.7859L11.4159 13.0084Z"
                    fill="url(#paint2_linear_21259_6217)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.1123 7.58874C17.9217 7.69374 18.6261 8.03499 19.2237 8.60987C19.8153 9.1729 20.2137 9.90853 20.3621 10.7116L22.6309 11.0984C22.0202 9.53387 21.4234 8.51712 20.8389 8.04549C20.2553 7.57562 19.0137 7.42337 17.1123 7.58874Z"
                    fill="url(#paint3_linear_21259_6217)"
                  />
                  <path
                    d="M20.4309 4.06525C20.4702 4.07664 20.5059 4.09766 20.535 4.12639C20.564 4.15512 20.5854 4.19065 20.5972 4.22975L20.8133 4.96125C20.952 5.42765 21.2049 5.85209 21.5489 6.19615C21.893 6.54022 22.3174 6.79305 22.7838 6.93176L23.5153 7.14876C23.5657 7.16399 23.6098 7.19501 23.6411 7.23724C23.6724 7.27947 23.6894 7.33067 23.6894 7.38326C23.6894 7.43585 23.6724 7.48704 23.6411 7.52927C23.6098 7.5715 23.5657 7.60252 23.5153 7.61776L22.7838 7.83476C22.3174 7.97346 21.893 8.22629 21.5489 8.57036C21.2049 8.91442 20.952 9.33886 20.8133 9.80526L20.5963 10.5359C20.5809 10.5859 20.5498 10.6296 20.5077 10.6607C20.4656 10.6917 20.4146 10.7085 20.3623 10.7085C20.3099 10.7085 20.259 10.6917 20.2168 10.6607C20.1747 10.6296 20.1437 10.5859 20.1282 10.5359L19.9103 9.80526C19.7716 9.33886 19.5188 8.91442 19.1747 8.57036C18.8307 8.22629 18.4062 7.97346 17.9398 7.83476L17.2092 7.61776C17.1589 7.60252 17.1148 7.5715 17.0834 7.52927C17.0521 7.48704 17.0352 7.43585 17.0352 7.38326C17.0352 7.33067 17.0521 7.27947 17.0834 7.23724C17.1148 7.19501 17.1589 7.16399 17.2092 7.14876L17.9398 6.93176C18.4062 6.79305 18.8307 6.54022 19.1747 6.19615C19.5188 5.85209 19.7716 5.42765 19.9103 4.96125L20.1282 4.22975C20.1468 4.1678 20.1892 4.11574 20.2461 4.08492C20.303 4.0541 20.3689 4.04703 20.4309 4.06525ZM23.9983 1.92063C24.0172 1.92623 24.0343 1.93644 24.0482 1.95034C24.0621 1.96425 24.0724 1.9814 24.0779 2.00025L24.183 2.35463C24.2502 2.58068 24.3728 2.78637 24.5397 2.95306C24.7065 3.11976 24.9123 3.24218 25.1384 3.30925L25.492 3.41425C25.5168 3.42121 25.5386 3.43608 25.5542 3.45662C25.5698 3.47716 25.5782 3.50223 25.5782 3.528C25.5782 3.55378 25.5698 3.57885 25.5542 3.59939C25.5386 3.61993 25.5168 3.6348 25.492 3.64175L25.1384 3.74675C24.9125 3.81395 24.7069 3.93643 24.5402 4.10312C24.3735 4.26981 24.251 4.47543 24.1838 4.70138L24.0788 5.05575C24.0719 5.08058 24.057 5.10244 24.0365 5.11802C24.0159 5.1336 23.9909 5.14203 23.9651 5.14203C23.9393 5.14203 23.9142 5.1336 23.8937 5.11802C23.8732 5.10244 23.8583 5.08058 23.8513 5.05575L23.7463 4.70138C23.679 4.47559 23.5565 4.27015 23.3898 4.10362C23.2231 3.9371 23.0175 3.81474 22.7917 3.74763L22.4373 3.64175C22.4125 3.6348 22.3906 3.61993 22.3751 3.59939C22.3595 3.57885 22.3511 3.55378 22.3511 3.528C22.3511 3.50223 22.3595 3.47716 22.3751 3.45662C22.3906 3.43608 22.4125 3.42121 22.4373 3.41425L22.7917 3.30925C23.0174 3.24202 23.2228 3.11961 23.3893 2.95309C23.5558 2.78657 23.6782 2.58119 23.7455 2.3555L23.8504 2.00025C23.8549 1.98525 23.8624 1.97129 23.8723 1.95918C23.8823 1.94708 23.8945 1.93707 23.9083 1.92974C23.9222 1.92242 23.9373 1.91791 23.9529 1.9165C23.9685 1.91508 23.9843 1.91679 23.9992 1.9215L23.9983 1.92063Z"
                    fill="#F5DA80"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_21259_6217"
                    x1="225.169"
                    y1="309.061"
                    x2="1621.02"
                    y2="1400.68"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4CDD9D" />
                    <stop offset="1" stop-color="#25B864" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_21259_6217"
                    x1="355.641"
                    y1="182.659"
                    x2="485.076"
                    y2="303.498"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#138747" />
                    <stop offset="1" stop-color="#2ABD6C" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_21259_6217"
                    x1="5.38441"
                    y1="22.6154"
                    x2="27.9992"
                    y2="8.61433"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4CDD9D" />
                    <stop offset="1" stop-color="#25B864" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_21259_6217"
                    x1="355.641"
                    y1="182.659"
                    x2="485.076"
                    y2="303.498"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#138747" />
                    <stop offset="1" stop-color="#2ABD6C" />
                  </linearGradient>
                  <clipPath id="clip0_21259_6217">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>
                {{ originalData?.reportTitle || 'AI经营分析报告' }}｜{{ currentWeekLabel }}
              </span>
            </div>
          </template>
        </div>
        <div class="right">
          <el-select v-model="currentWeek" placeholder="周" @change="initReport">
            <el-option
              v-for="item in weekOptions"
              :key="item.week"
              :label="item.week"
              :value="item.week"
            />
          </el-select>
          <div class="actions">
            <IconTooltip
              :icon-class="isFullscreen ? 'icon-shouqiquanping' : 'icon-quanping'"
              :content="isFullscreen ? '退出全屏' : '全屏'"
              @click="handleView"
            />
            <i class="gap"></i>
            <IconTooltip content="关闭" icon-class="icon-guanbi" @click="visible = false" />
          </div>
        </div>
      </div>
    </template>
    <div class="ai-report-main" v-loading="loading">
      <!-- 目录 -->
      <div class="catalog">
        <div class="catalog-title">目录</div>
        <div
          @click="onTabClick(c.id)"
          class="h1"
          :class="{ 'is-active': c.id.toString() === activeTab }"
          v-for="(c, index) in catalogList"
          :key="c.id"
          :data-id="c.id"
        >
          {{ transformChineseIndex(index) }}、{{ c.title }}
        </div>
      </div>
      <el-scrollbar v-if="originalData">
        <div id="top-safe-line"></div>
        <div class="report-tips">
          <el-image class="emoji-image" :src="emojiPath" />
          <span>报告由{{ originalData?.creatorName }}生成 / 全文共 {{ charNum }} 字</span>
        </div>
        <div class="report-content" :class="{ editable: editPermission }">
          <template v-for="reportHtml in reportHtmlList" :key="reportHtml.id">
            <div :id="reportHtml.id" class="config-title-wrapper">
              <span class="config-title">{{ reportHtml.title }}</span>
              <div v-if="editingIdList.includes(reportHtml.id!)" class="operation">
                <el-button text @click="handleCancel(reportHtml.id!)">取消</el-button>
                <el-button type="primary" @click="handleSave(reportHtml.id!)">保存</el-button>
              </div>
            </div>
            <template v-if="editingIdList.includes(reportHtml.id!)">
              <WeeklyReportEditor v-model:content="reportHtml.configContent" />
            </template>
            <template v-else>
              <div
                @click="handleEdit(reportHtml.id!)"
                class="config-content"
                v-html="reportHtml.configContent"
              ></div>
            </template>
            <template v-for="vxeGridConfig in reportHtml.vxeGridList" :key="vxeGridConfig.title">
              <div class="table-wrapper">
                <vxe-grid v-bind="vxeGridConfig" border round size="small">
                  <template #number="{ row, column }">
                    <span>{{ formatNumberObj(row[column.field]) }}</span>
                  </template>
                  <template #rate="{ row, column }">
                    <div class="rate-column">
                      <el-progress
                        :percentage="calcPercentageNum(row[column.field] || 0)"
                        :color="row[column.field] > 0 ? '#02B96B' : '#F53F3F'"
                        :stroke-width="6"
                        :show-text="false"
                      />
                      <span class="text">{{ formatRate(row[column.field]) }}</span>
                    </div>
                  </template>
                </vxe-grid>
              </div>
            </template>
          </template>
        </div>
      </el-scrollbar>
      <div v-else class="empty-report">
        <EmptyAnimation :width="128" :height="128" name="listEmpty" />
        <span>暂无报告</span>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { mpcWeeklyReportApi, MpcWeeklyReportContracts } from '@/api';
  import IconTooltip from '@/views/bi/components/IconTooltip.vue';
  import { formatNumberObj, formatRate } from '@/views/bi/utils/utils';
  import dayjs from 'dayjs';
  import { useStore } from '@/store/modules/useStore';
  import WeeklyReportEditor from './LtAnalysisReport/components/WeeklyReportEditor.vue';
  import emojiPath from '../emoji.png';

  const visible = ref(false);
  const open = () => {
    visible.value = true;
    isFullscreen.value = false;
    currentWeek.value = weekOptions.value[0]?.week || '';
    initReport();
  };
  defineExpose({
    open,
  });

  const currentWeek = ref('');
  const currentWeekLabel = computed(() => {
    return currentWeek.value.replace(/^(?<year>\d{4})(?<week>Week\d{2}).*$/, '$<week>');
  });
  const weekOptions = ref<MpcWeeklyReportContracts.WeekBean[]>([]);
  mpcWeeklyReportApi.luteosMarketWeekReportQueryAiAnalysisWeekList().then((res) => {
    weekOptions.value = res.weekList;
    if (res.weekList.length > 0) {
      currentWeek.value = res.weekList[0].week!;
    }
  });

  const catalogList = ref<{ id: number; title: string }[]>([]);
  const reportHtmlList = ref<
    (MpcWeeklyReportContracts.MarketWeeklyReportDetailBean & { vxeGridList: any[] })[]
  >([]);
  const loading = ref(false);
  const originalData = ref<MpcWeeklyReportContracts.MarketWeeklyReportDetailResp | null>(null);
  const initReport = async () => {
    loading.value = true;
    editingIdList.value = [];
    try {
      const res = await mpcWeeklyReportApi.luteosMarketWeekReportQueryAiAnalysisReportDetail({
        period: currentWeek.value,
      });
      originalData.value = res;
      catalogList.value =
        res.itemList?.map((item) => ({
          id: item.id!,
          title: item.title!,
        })) || [];
      reportHtmlList.value =
        res.itemList?.map((item) => {
          const tableData = JSON.parse(item.remark || '{}');
          if (Array.isArray(tableData)) {
            return {
              ...item,
              configContent: item.configContent || '',
              vxeGridList: [
                {
                  ...generateVxeGridConfig(tableData),
                },
              ],
            };
          }
          const vxeGridList = Object.keys(tableData)
            .map((key) => {
              if (Array.isArray(tableData[key])) {
                return {
                  ...generateVxeGridConfig(tableData[key]),
                };
              }
              return null;
            })
            .filter(Boolean);
          return {
            ...item,
            configContent: item.configContent || '',
            vxeGridList,
          };
        }) || [];
      calcFontNum();
      activeTab.value = catalogList.value[0]?.id.toString() || '0';
      setupIntersectionObserver();
    } catch (error) {
      catalogList.value = [
        { id: 1, title: '周总结' },
        { id: 2, title: '本月预算达成情况' },
        { id: 3, title: '库存周转情况' },
      ];
      reportHtmlList.value = [];
      originalData.value = null;
    } finally {
      loading.value = false;
    }
  };
  const generateVxeGridConfig = (tableData: any[]): any => {
    return {
      data: tableData || [],
      columns: Object.keys(tableData[0] || {})
        .map((colKey) => {
          const currentValue = tableData[0][colKey];
          const extraProps: any = {};
          if (typeof currentValue === 'number') {
            extraProps.align = 'right';
            // extraProps.formatter = ({ cellValue }: any) => {
            //   return colKey.includes('%') || colKey.includes('率')
            //     ? formatRate(cellValue).toString()
            //     : formatNumberObj(cellValue).toString();
            // };
            extraProps.minWidth = colKey.includes('%') || colKey.includes('率') ? 126 : 96;
            extraProps.slots = {
              default: colKey.includes('%') || colKey.includes('率') ? 'rate' : 'number',
            };
          } else {
            extraProps.minWidth = 86;
          }
          return {
            field: colKey,
            title: colKey,
            ...extraProps,
          };
        })
        .filter((item) => item.title !== '周'),
      spanMethod({
        row,
        rowIndex,
        column,
        visibleData,
      }): void | { rowspan: number; colspan: number } {
        const spanFields = ['GTM组'];
        const cellValue = row[column.field];
        if (cellValue && spanFields.includes(column.field)) {
          const prevRow = visibleData[rowIndex - 1];
          let nextRow = visibleData[rowIndex + 1];
          if (prevRow && prevRow[column.field] === cellValue) {
            return { rowspan: 0, colspan: 0 };
          }
          let countRowspan = 1;
          while (nextRow && nextRow[column.field] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      },
    };
  };
  const isFullscreen = ref(false);
  const handleView = () => {
    isFullscreen.value = !isFullscreen.value;
  };

  const editingIdList = ref<number[]>([]);
  const handleEdit = async (id: number) => {
    if (editPermission.value) {
      editingIdList.value.push(id);
    }
  };
  const handleCancel = (id: number) => {
    const originalItem = originalData.value?.itemList?.find((item) => item.id === id);
    const reportItem = reportHtmlList.value.find((item) => item.id === id);
    if (originalItem && reportItem) {
      reportItem.configContent = originalItem.configContent || '';
    }
    editingIdList.value = editingIdList.value.filter((editId) => editId !== id);
  };
  const handleSave = async (id: number) => {
    const reportItem = reportHtmlList.value.find((item) => item.id === id);
    if (reportItem) {
      const res = await mpcWeeklyReportApi.luteosMarketWeekReportUpdateByDetailId({
        ...originalData.value,
        itemList: [
          {
            detailId: reportItem.detailId!,
            configContent: reportItem.configContent || '',
          },
        ],
      });
      Object.assign(originalData.value, res);
      // 更新originalData
      const originalItem = originalData.value?.itemList?.find((item) => item.id === id);
      if (originalItem) {
        originalItem.configContent = reportItem.configContent;
      }
      editingIdList.value = editingIdList.value.filter((editId) => editId !== id);
      calcFontNum();
    }
  };

  const charNum = ref(0);
  const calcFontNum = () => {
    nextTick(() => {
      charNum.value = 0;
      document.querySelectorAll('#ai-report-dialog .config-content').forEach((el) => {
        let text = el.textContent || '';
        text = text.replace(/\s+/g, '');
        charNum.value += text.length;
      });
    });
  };

  const onTabClick = (id: number) => {
    const targetElement = document.getElementById(id.toString());
    if (targetElement) {
      activeTab.value = id.toString();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const activeTab = ref('0');
  const isSticky = ref(false);
  const onIntersectionObserver = (entry: IntersectionObserverEntry[]) => {
    if (entry[0].isIntersecting) {
      if (entry[0].target.id === 'top-safe-line') {
        isSticky.value = false;
      } else {
        // 处理进入视口的逻辑
        activeTab.value = entry[0].target.id;
      }
    } else if (entry[0].target.id === 'top-safe-line') {
      isSticky.value = true;
    }
  };
  let observer: IntersectionObserver | null = null;
  const createIntersectionObserver = () => {
    const options = {
      root: document.querySelector('#ai-report-dialog .ai-report-main'),
      rootMargin: '0px',
    };
    observer = new IntersectionObserver(onIntersectionObserver, options);
    catalogList.value.forEach((c) => {
      const element = document.getElementById(c.id.toString());
      if (element) {
        observer?.observe(element);
      }
    });
    const topSafeLine = document.getElementById('top-safe-line');
    if (topSafeLine) {
      observer?.observe(topSafeLine);
    }
  };
  onBeforeUnmount(() => {
    observer?.disconnect();
  });
  const setupIntersectionObserver = () => {
    nextTick(() => {
      createIntersectionObserver();
    });
  };
  const transformChineseIndex = (index: number): string => {
    const chineseNumbers = [
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '十一',
      '十二',
      '十三',
      '十四',
      '十五',
      '十六',
      '十七',
      '十八',
      '十九',
      '二十',
    ];
    return chineseNumbers[index] || (index + 1).toString();
  };

  const store = useStore();
  const editPermission = computed(() => {
    // 后续authList会变成映射表储存在state，方案查询
    const resource = store.authList || [];
    const hasPermission = resource.find((code: string) => code === 'aiReport-edit');
    return hasPermission;
  });

  const calcPercentageNum = (num: number): number => {
    const absNumber = Math.abs(num * 100);
    if (absNumber > 100) {
      return 100;
    }
    if (absNumber < 0) {
      return 0;
    }
    return ~~absNumber;
  };
</script>

<style lang="scss" scoped>
  .ai-report-header {
    border-radius: 10px 10px 0 0;
    background: linear-gradient(180deg, #f3fef9 0%, rgba(243, 254, 249, 0) 100%);
    padding: 24px 24px 20px;
    display: flex;
    justify-content: space-between;
    &.sticky {
      background: #ffffff;
    }
    .left {
      color: var(---N9, var(---N9, #1f1f1f));

      /* 突出/Medium 20 */
      font-family: 'PingFang SC Medium', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial,
        sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px; /* 140% */
    }
    .update-info {
      margin-top: 6px;
      display: flex;
      align-items: center;
      column-gap: 6px;
      color: var(---N6, #999);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      .icon-shijian {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .right {
      display: flex;
      align-items: start;
      column-gap: 32px;
      .el-select {
        width: 159px;
        :deep(.el-select__placeholder) {
          font-size: 12px;
        }
      }
      .actions {
        display: flex;
        align-items: center;
        column-gap: 14px;
        height: 32px;
      }
    }
  }
  .ai-report-main {
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 248px 1fr;
    grid-template-rows: 100%;
    background: #ffffff;
    .catalog {
      border-right: 1px solid var(---N2, #f5f5f5);
      padding: 10px 18px 10px 24px;
      .h1 {
        padding: 4px 8px;
        overflow: hidden;
        color: var(---N8, #666);
        text-overflow: ellipsis;
        white-space: nowrap;

        /* 常规/Medium 13 */
        font-family: 'PingFang SC Medium', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 169.231% */
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          background: var(---N1, #fafafa);
        }
        &.is-active {
          background: var(--el-color-primary-light-9, #e1f3ff);
          color: var(--el-color-primary-dark-2, #096dd9);
        }
      }
    }
    .catalog-title {
      padding: 4px 8px;
      color: var(---N9, #1f1f1f);

      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial,
        sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
    .editor-wrap {
      border-radius: 10px 10px 0 0;
      :deep(.w-e-text-container) {
        max-height: 326px;
        overflow-y: auto;
      }
      &.w-e-full-screen-container {
        position: fixed;
        z-index: 3;
        :deep(.w-e-text-container) {
          max-height: unset;
        }
      }
    }

    .report-content {
      padding: 26px 26px 26px 36px;
      min-height: 600px;
      overflow-y: auto;
      :deep(h2) {
        font-size: 18px;
      }
      :deep(h3) {
        font-size: 16px;
      }
      :deep(h4) {
        font-size: 14px;
      }
      .config-title-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        &:first-child {
          margin-top: 0;
        }
      }
      .config-title {
        color: var(---N9, #1f1f1f);

        /* 突出/Medium 18 */
        font-family: 'PingFang SC Medium', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 26px; /* 144.444% */
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        column-gap: 8px;

        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 14px;
          border-radius: 15px;
          background: var(---P6, #02b96b);
        }
      }
      .config-content {
        margin-bottom: 26px;
      }
      &.editable {
        .config-content {
          padding: 16px;
          border: 1px solid var(---N3, #ededed);
          border-radius: 10px 10px 0 0;
          margin-bottom: 0px;
          cursor: text;
          &:hover {
            border-radius: 10px 10px 0 0;
            border: 1px solid var(---N3, #ededed);
            background: var(---N1, #fafafa);
          }
        }
        .table-wrapper {
          :deep(
              .vxe-table--render-default.is--round.is--header
                .vxe-table--header-wrapper.body--wrapper
            ) {
            --vxe-ui-table-border-radius: 0;
          }
          :deep(.vxe-table--render-default.is--round .vxe-table--border-line) {
            border-radius: 0 0 var(--vxe-ui-table-border-radius) var(--vxe-ui-table-border-radius);
          }
        }
      }
      .table-wrapper {
        background: var(---N0, #fff);
        // margin: 26px 0;
      }
      .table-title {
        overflow: hidden;
        color: var(---N9, var(---N9, #1f1f1f));
        text-overflow: ellipsis;

        /* 常规/Medium 14 */
        font-family: 'PingFang SC Medium', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
        margin-bottom: 26px;
      }
    }
    .report-tips {
      display: flex;
      align-items: center;
      padding: 28px 36px 0 36px;
      color: var(---N6, #999);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      .emoji-image {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: contain;
      }
    }
  }
  .gap {
    width: 1px;
    height: 12px;
    background: #d9d9d9;
  }
  .rate-column {
    display: grid;
    grid-template-columns: 1fr 50px;
    align-items: center;
    column-gap: 8px;
    .text {
      // 不换行
      white-space: nowrap;
    }
  }
  .empty-report {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(---N6, #999);

    /* 较弱/Regular 14 */
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    .el-empty__image {
      margin-bottom: 16px;
    }
  }
</style>

<style lang="scss">
  #ai-report-dialog {
    overflow: hidden;
    transform: scale(1);
    &:not(.is-fullscreen) {
      .el-dialog__body {
        height: calc(100vh - 320px) !important;
        max-height: unset !important;
      }
    }
    &.is-fullscreen {
      border-radius: 0 !important;
      .el-dialog__body {
        height: calc(100vh - 100px) !important;
        max-height: unset !important;
      }
    }
    .el-dialog__header {
      margin: 0;
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
      overflow: hidden;
      display: grid;
      grid-template-rows: 1fr; /* 单行填满 */
    }
    .el-dialog__footer {
      padding: 16px 24px;
    }
  }
</style>
