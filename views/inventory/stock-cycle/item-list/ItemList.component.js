import { useRouter } from "next/router";
import CustomImage from "../../../modules/image/CustomImage";
import PagenationComponentV2 from "../../../modules/pagenation/PagenationComponentV2";
import CustomSelect from "../../../modules/select/CustomSelect";
import ResizableTh from "../../../modules/table/ResizableTh";
import { Container, ControlFieldContainer, PagenationContainer, SortControlContainer, TableBox, TableWrapper } from "./styles/ItemList.styled";
import useInventoryStockCyclePageHook from "./hooks/useInventoryStockCyclePageHook";

function returnRecommendPurchaseUnits(
    releaseUnitPerPeriod,
    stockUnit,
    leadTime,
    averageReleaseUnitPerDay,
    safetyIndexVariable
) {
    const value = Math.ceil((releaseUnitPerPeriod - stockUnit + (leadTime * averageReleaseUnitPerDay)) * safetyIndexVariable);
    return value <= 0 ? 0 : value;
}

export default function ItemListComponent(props) {
    const router = useRouter();
    const leadTime = router?.query?.leadTime;

    const {
        inventoryStockCyclePage
    } = useInventoryStockCyclePageHook();

    const handleSelectSort = (e) => {
        let value = e.target.value;

        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort: value,
                page: 1
            }
        }, undefined, { scroll: false })
    }

    if (!inventoryStockCyclePage) {
        return null;
    }

    return (
        <>
            <Container>
                <ControlFieldContainer>
                    <div></div>
                    <SortControlContainer>
                        <CustomSelect
                            className='select-item'
                            onChange={(e) => handleSelectSort(e)}
                            value={router?.query?.sort || SORTED_BY[0]}
                        >
                            {SORTED_BY?.map(r => {
                                return (
                                    <option key={r.sort} value={r.sort}>{r.name}</option>
                                )
                            })}
                        </CustomSelect>
                    </SortControlContainer>
                </ControlFieldContainer>
                <Table
                    inventoryStockCycles={inventoryStockCyclePage?.content}
                    leadTime={leadTime}
                />

            </Container>
            <PagenationContainer>
                <PagenationComponentV2
                    align={'center'}
                    pageIndex={inventoryStockCyclePage?.number}
                    totalPages={inventoryStockCyclePage?.totalPages}
                    isFirst={inventoryStockCyclePage?.first}
                    isLast={inventoryStockCyclePage?.last}
                    totalElements={inventoryStockCyclePage?.totalElements}
                    sizeElements={[20, 50, 100]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                />
            </PagenationContainer>
        </>
    );

}

function Table({
    inventoryStockCycles,
    leadTime
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <thead>
                        <tr>
                            {TABLE_HEADER?.map(r => {
                                if (r.resizable) {
                                    return (
                                        <ResizableTh
                                            key={r.name}
                                            className="fixed-header"
                                            scope="col"
                                            width={r.defaultWidth}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            {r.headerName}
                                        </ResizableTh>
                                    );
                                } else {
                                    return (
                                        <th
                                            key={r.name}
                                            className="fixed-header"
                                            scope="col"
                                            width={r.defaultWidth}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            {r.headerName}
                                        </th>
                                    );
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryStockCycles?.map((inventoryStockCycle) => {

                            return (
                                <tr
                                    key={inventoryStockCycle?.productOptionId}
                                >
                                    <td>
                                        <div className='content-box'>
                                            <div className='thumbnail-figure'>
                                                <CustomImage
                                                    src={inventoryStockCycle?.productThumbnailUri}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div>{inventoryStockCycle?.productCategoryName} / {inventoryStockCycle?.productSubCategoryName}</div>
                                            <div><span style={{ color: 'var(--mainColor)' }}>{inventoryStockCycle?.productName}</span> [{inventoryStockCycle?.productName || '태그 미지정'}]</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ fontWeight: '600' }}>{inventoryStockCycle?.productOptionName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ fontWeight: '600' }}>{inventoryStockCycle?.productOptionCode}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: '#444', fontWeight: '500' }}>{inventoryStockCycle?.stockUnit} 개</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: '#444', fontWeight: '500' }}>{inventoryStockCycle?.releaseUnitPerPeriod} 개</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: '#444', fontWeight: '500' }}>{inventoryStockCycle?.averageReleaseUnitPerDay} 개</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: 'var(--mainColor)', fontWeight: '700' }}>{inventoryStockCycle?.stockCyclePerDay} 일</div>
                                        </div>
                                    </td>
                                    <td>
                                        {leadTime &&
                                            <div className='content-box'>
                                                {inventoryStockCycle?.stockCyclePerDay <= leadTime &&
                                                    <div style={{ color: 'var(--defaultRedColor)', fontWeight: '700' }}>재고 위험성 높음</div>
                                                }
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        {leadTime &&
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultGreenColor)', fontWeight: '700' }}>
                                                    {
                                                        returnRecommendPurchaseUnits(
                                                            inventoryStockCycle?.releaseUnitPerPeriod,
                                                            inventoryStockCycle?.stockUnit,
                                                            leadTime,
                                                            inventoryStockCycle?.averageReleaseUnitPerDay,
                                                            1
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper >
    );
}

const TABLE_HEADER = [
    {
        resizable: false,
        name: 'thumbnailUri',
        headerName: '상품 이미지',
        defaultWidth: 80
    },
    {
        resizable: true,
        name: 'productInfo',
        headerName: '상품정보',
        defaultWidth: 250
    },
    {
        resizable: true,
        name: 'productOptionCode',
        headerName: '옵션명',
        defaultWidth: 250
    },
    {
        resizable: true,
        name: 'productOptionCode',
        headerName: '옵션코드',
        defaultWidth: 150
    },
    {
        resizable: true,
        name: 'stockUnit',
        headerName: '재고수량',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'releaseUnitPerPeriod',
        headerName: '기간내 출고량',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'averageReleaseUnitPerDay',
        headerName: '일평균 출고량',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'stockCyclePerDay',
        headerName: '출고가능 일수',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'warning',
        headerName: '경보',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'recommendPurchaseUnit',
        headerName: '추천 구매 수량',
        defaultWidth: 120
    },
]

const SORTED_BY = [
    {
        sort: 'product.name_asc',
        name: '상품명 오름차순'
    },
    {
        sort: 'product.name_desc',
        name: '상품명 내림차순'
    }
]