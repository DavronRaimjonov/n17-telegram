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
//
//`<p class="otherMessage"> ${value.text}</p>`
//
