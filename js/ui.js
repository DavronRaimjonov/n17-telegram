export function drawUiUser(value) {
  return `
    <div
    id=${value.id}
    class="relative user_item"
  >
    <div class="flex flex-col w-full  px-2 select-none">
      <div
        class="flex flex-no-wrap items-center pr-3 rounded-lg cursor-pointer mt-200 py-65 bg-[#2b5278]"
        style="padding-top: 0.65rem; padding-bottom: 0.65rem"
      >
        <div class="flex justify-between w-full">
          <div class="flex justify-between w-full">
            <div
              class="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink"
            >
              <img
                id="chatUserAvatar"
                class="object-cover w-12 h-12 rounded-full"
                src=${value.img}
                alt=""
              />
              <div
                class="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full"
                style="width: 0.8rem; height: 0.8rem"
              >
                <div
                  class="bg-green-500 rounded-full"
                  style="width: 0.6rem; height: 0.6rem"
                ></div>
              </div>
            </div>

            <div
              class="items-center flex justify-between flex-1 min-w-0"
            >
              <div class="flex flex-col gap-0">
                <div class="flex justify-between items-center mb-1">
                  <h2
                    class="text-sm font-semibold text-white"
                    id="chatUserName"
                  >
                   ${value.username}
                  </h2>
                </div>
                <div
                  class="flex text-[#cfcfcf] justify-between text-sm leading-none truncate"
                >
                  <span>Send message</span>
                </div>
              </div>
              <i class="bx bx-check-double text-[20px] text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="notification text-[12px] absolute bottom-1 right-3 text-black hidden  rounded-full items-center justify-center bg-[#eee] w-[18px] h-[18px]">1</p>
  </div>

    `;
}

export function uiChatuser(data, recerved_id, user_id) {
  return `
   <div class="bg-[#0e1621] h-[100vh] pb-32  text-white flex relative flex-col items-start  w-full overflow-x-hidden overflow-y-scroll">
      ${data
        .map((value) => {
          return `
   ${
     value.recerved_id === recerved_id && value.user_id === user_id
       ? `<p class="ownMessage"> ${value.text}</p>`
       : value.recerved_id === user_id && value.user_id === recerved_id
       ? `<p class="otherMessage"> ${value.text}</p>`
       : ""
   }
      `;
        })
        .join(" ")}
  </div>`;
}

export function loadingHTML() {
  return `<div role="status">
      <svg
        aria-hidden="true"
        class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>`;
}

//
//`<p class="otherMessage"> ${value.text}</p>`
//
