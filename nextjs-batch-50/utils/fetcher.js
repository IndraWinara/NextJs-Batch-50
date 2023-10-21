const fetcher = (...args) => fetch(...args).then((ress) => ress.json())

export default fetcher