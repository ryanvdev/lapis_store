const isClientSide = () => {
    return typeof window !== "undefined";
}

export default isClientSide;