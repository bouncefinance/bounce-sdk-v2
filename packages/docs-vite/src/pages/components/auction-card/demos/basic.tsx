import { AuctionCard, AuctionHolder, AuctionListItem } from '@bouncefinance/ui'

export default () => {
  const props = {
    categoryName: 'Dutch Auction',
    claimAt: 1688436000,
    closeAt: 1688356800,
    dateStr: 1688356800,
    holder: (
      <AuctionHolder
        {...{
          avatar: 'https://example.com/avatar.jpg',
          name: 'AI助手',
          description: '我是一个智能AI助手，可以回答您的问题。',
          href: 'https://example.com/profile',
          isVerify: 1
        }}
      />
    ),
    listItems: <AuctionListItem label="lable" value="value" />,
    poolId: '9',
    progress: {
      symbol: 'CZ',
      decimals: 18,
      sold: '0',
      supply: '10000000000000000000'
    },
    status: 4,
    style: {
      minWidth: 'unset'
    },
    title: 'cz2eth2',
    whiteList: 'Public'
  }
  return (
    <AuctionCard
      {...props}
      isCreator
      chainConfigInBackend={{
        chainName: 'Sepolia',
        chain_type: 1,
        ethChainId: 11155111,
        id: 5,
        shortName: 'sepolia'
      }}
      style={{ width: '312px', minWidth: 'unset' }}
    />
  )
}
