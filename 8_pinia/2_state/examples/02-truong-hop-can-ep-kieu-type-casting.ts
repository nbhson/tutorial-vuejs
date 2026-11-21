interface UserInfo {
  name: string
  age: number
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: [] as UserInfo[],
      user: null as UserInfo | null,
    }
  },
})
