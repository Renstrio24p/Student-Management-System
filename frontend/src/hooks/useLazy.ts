

export default function useLazy(path: string) {
    return () => import(`${path}/${path}`).then((module) => module.default);
}