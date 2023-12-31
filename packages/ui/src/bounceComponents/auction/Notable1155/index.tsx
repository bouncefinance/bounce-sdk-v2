import { H3, H4 } from '../../../components/Text'
import { Box, Container, MenuItem, Select, Button } from '@mui/material'
import { useState } from 'react'
import { SlideProgress } from '../SlideProgress'
import { NFTCard } from '../../../pages/market/nftAuctionPool'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import { useRequest } from 'ahooks'
import { getPools } from '../../../api/market'
import { FixedSwapPool } from '../../../api/pool/type'
import { SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { CenterRow, Row } from '../../../components/Layout'
import AuctionTypeSelect from '../../common/AuctionTypeSelect'
import { BackedTokenType } from '@/enums'
import EmptyData from '@/bounceComponents/common/EmptyData'
import { HomeNFTSkeletonCard } from '../Notable721'
import getAuctionPoolLink from '@/utils/auction/getAuctionPoolRouteLink'
import useBreakpoint from '@/hooks/useBreakpoint'
import useResizeView from '@/utils/useResizeView'
import { TokenType as ERCType } from '@/bounceComponents/create-auction-pool/types'
interface Notable1155Props {
  handleViewAll?: () => void
}

export const Notable1155 = (props: Notable1155Props) => {
  const { handleViewAll } = props
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)
  const isSm = useBreakpoint('sm')
  const [slidesPerView] = useResizeView()
  const { data, loading } = useRequest(
    async () => {
      const resp = await getPools({
        offset: 0,
        limit: 10,
        category: auction,
        chainId: chainFilter,
        creatorAddress: '',
        creatorName: '',
        isERC721: 1,
        orderBy: 'openTs',
        poolId: '',
        poolName: '',
        tokenType: 2, // erc20:1, nft:2
        token0Address: ''
      })
      return {
        list: resp.data.fixedSwapNftList.list,
        total: resp.data.fixedSwapNftList.total
      }
    },
    {
      refreshDeps: [auction, chainFilter]
    }
  )

  return (
    <Box sx={{ background: 'white', padding: '80px 0 100px' }}>
      <Container>
        <H3 justifyContent="center">Notable Auctions</H3>
        <CenterRow
          mb={33}
          justifyContent="space-between"
          mt={40}
          p={16}
          sx={{ flexDirection: isSm ? 'column' : 'row', alignItems: isSm ? 'flex-start' : 'center' }}
        >
          <H4>ERC1155</H4>
          <Row gap={8} mt={20}>
            <AuctionTypeSelect
              curPoolType={auction}
              setCurPoolType={setAuction}
              ercType={ERCType.ERC1155}
              tokenType={BackedTokenType.NFT}
            />
            <Select
              sx={{
                width: isSm ? '160px' : '200px',
                height: '38px'
              }}
              value={chainFilter}
              onChange={e => setChainFilter(Number(e.target.value))}
            >
              <MenuItem key={0} value={0}>
                All Chains
              </MenuItem>
              {optionDatas?.chainInfoOpt?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.chainName}
                </MenuItem>
              ))}
            </Select>
          </Row>
        </CenterRow>
        {loading ? (
          <HomeNFTSkeletonCard />
        ) : data?.list?.length === 0 ? (
          <Box>
            <EmptyData />
          </Box>
        ) : isSm ? (
          <Box
            pl={16}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              gap: 12,
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {data
              ? data.list.map((item: FixedSwapPool, idx: number) => (
                  <Box style={{ width: '309px' }} key={idx}>
                    <Link to={getAuctionPoolLink(item.id, item.category, item.chainId, item.poolId.toString())}>
                      <NFTCard nft={item} hiddenStatus={true} />
                    </Link>
                  </Box>
                ))
              : []}
          </Box>
        ) : (
          <SlideProgress
            grayArrow
            swiperStyle={{
              spaceBetween: 20,
              slidesPerView: slidesPerView,
              loop: false
            }}
          >
            {data
              ? data.list.map((item: FixedSwapPool, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Box style={{ width: '309px' }}>
                      <Link to={getAuctionPoolLink(item.id, item.category, item.chainId, item.poolId.toString())}>
                        <NFTCard nft={item} hiddenStatus={true} />
                      </Link>
                    </Box>
                  </SwiperSlide>
                ))
              : []}
          </SlideProgress>
        )}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '40px 0 0'
          }}
        >
          <Button
            onClick={() => {
              handleViewAll && handleViewAll()
            }}
            variant="contained"
            // href={AuctionList[currentIndex].checkAllLink}
            sx={{
              // background: 'var(--ps-yellow-1)',
              padding: '16px 20px'
            }}
          >
            View all auctions
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
