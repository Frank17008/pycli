import ora from "ora"
const loading = ora("Loading")

export const startLoading = (text = "下载中...") => {
    loading.text = text
    loading.color = "green"
    loading.start()
}

export const endLoading = () => {
    loading.stop()
}
