export const getStaticAssetsUrl = (path: string) => {
	let currentPath = path
	if (currentPath[0] === '/') {
		currentPath = path.slice(1)
	}
	return new URL(`/${currentPath}`, import.meta.url).href
}
