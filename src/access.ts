interface initialState {
  account?: {
    result?: object
  }
}
export default function access(initialState: initialState) {
  const { account } = initialState || {};
  return {
    ...account?.result,
    0: true,
    1: true,
    2: true,
    3: true,
  };
}

