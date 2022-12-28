import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import InfiniteScrollObserver from "../../../../../modules/observer/InfiniteScrollObserver";
import ReverseScrollObserver from "../../../../../modules/observer/ReverseScrollObserver";
import ResizableTh from "../../../../../modules/table/ResizableTh";
import { TableBox, TableWrapper } from "../styles/EditErpItemsModal.styled";

const TABLE_DATA_VIEW_SIZE = 40;
const TABLE_DATA_INC_DEC_SIZE = 20;

export default function MatchingCodeAndManagementMemoTable({
    editErpItems,
    onChangeValueOfName,
    onSelectClearErpItem
}) {
    const [prevViewSize, setPrevViewSize] = useState(0);
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);

    useEffect(() => {
        if (viewSize > TABLE_DATA_VIEW_SIZE) {
            setPrevViewSize(viewSize - TABLE_DATA_VIEW_SIZE);
        } else {
            setPrevViewSize(0);
        }
    }, [viewSize]);

    const handleFetchMoreItemsView = () => {
        let newViewSize = viewSize + TABLE_DATA_INC_DEC_SIZE;

        setViewSize(newViewSize);
    }

    const handleFetchPrevItemsView = () => {
        if (viewSize > TABLE_DATA_VIEW_SIZE) {
            setViewSize(viewSize - TABLE_DATA_INC_DEC_SIZE);
        }
    }

    const handleFetchInitPrevItemsView = () => {
        if (prevViewSize !== 0) {
            setViewSize(TABLE_DATA_VIEW_SIZE);
        }
    }

    return (
        <>
            <TableWrapper>
                <TableBox>
                    <table
                        cellSpacing={0}
                    >
                        <thead>
                            <tr>
                                <th
                                    className="fixed-header"
                                    scope="col"
                                    width={50}
                                    style={{
                                        zIndex: '10'
                                    }}
                                >
                                    No.
                                </th>
                                <th
                                    className="fixed-header"
                                    scope="col"
                                    width={50}
                                    style={{
                                        zIndex: '10'
                                    }}
                                >
                                    해제
                                </th>
                                {HEADERS?.map((r, index) => {
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
                                            <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                                {r.required &&
                                                    <span className='required-tag'></span>
                                                }
                                                {r.headerName}
                                            </div>
                                        </ResizableTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {prevViewSize !== 0 &&
                                <ReverseScrollObserver
                                    elementTagType={'tr'}
                                    totalSize={editErpItems?.length || 0}
                                    startOffset={prevViewSize || 0}
                                    endOffset={viewSize || 0}
                                    dataViewSize={TABLE_DATA_VIEW_SIZE}
                                    threshold={0}
                                    fetchData={() => handleFetchInitPrevItemsView()}
                                    loadingElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            로딩중...
                                        </td>
                                    }
                                    endElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            마지막 데이터 입니다.
                                        </td>
                                    }
                                />
                            }
                            {editErpItems?.slice(0, viewSize)?.map((erpItem, index) => {
                                if (index < prevViewSize) {
                                    return (
                                        <tr key={erpItem.id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                        </tr>
                                    )
                                }

                                if (index === prevViewSize && viewSize > TABLE_DATA_VIEW_SIZE) {
                                    return (
                                        <ReverseScrollObserver
                                            key={erpItem.id}
                                            elementTagType={'tr'}
                                            totalSize={editErpItems?.length || 0}
                                            startOffset={prevViewSize || 0}
                                            endOffset={viewSize || 0}
                                            dataViewSize={TABLE_DATA_VIEW_SIZE}
                                            threshold={0}
                                            fetchData={() => handleFetchPrevItemsView()}
                                            loadingElementTag={
                                                <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                    로딩중...
                                                </td>
                                            }
                                            endElementTag={
                                                <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                    마지막 데이터 입니다.
                                                </td>
                                            }
                                        />
                                    );
                                }

                                return (
                                    <tr
                                        key={erpItem.id}
                                    >
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <SingleBlockButton
                                                type='button'
                                                className='delete-button-item'
                                                onClick={() => onSelectClearErpItem(erpItem.id)}
                                            >
                                                <div className='icon-figure'>
                                                    <CustomImage
                                                        src={'/images/icon/delete_default_e56767.svg'}
                                                    />
                                                </div>
                                            </SingleBlockButton>
                                        </td>
                                        {HEADERS.map((header) => {
                                            return (
                                                <td
                                                    key={header.name}
                                                >
                                                    <input
                                                        type='text'
                                                        className='input-item'
                                                        name={header.name}
                                                        value={erpItem[header.name]}
                                                        placeholder={`${header.headerName}을(를) 입력`}
                                                        onChange={(e) => onChangeValueOfName(e, erpItem.id)}
                                                    ></input>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                            <InfiniteScrollObserver
                                elementTagType={'tr'}
                                totalSize={editErpItems?.length || 0}
                                startOffset={0}
                                endOffset={viewSize}
                                fetchData={handleFetchMoreItemsView}
                                loadingElementTag={
                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                        로딩중...
                                    </td>
                                }
                                endElementTag={
                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                        마지막 데이터 입니다.
                                    </td>
                                }
                            />
                        </tbody>
                    </table>
                </TableBox>
            </TableWrapper>
        </>
    );
}

const HEADERS = [
    {
        name: 'managementMemo1',
        headerName: '관리메모1',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'managementMemo2',
        headerName: '관리메모2',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo3',
        headerName: '관리메모3',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo4',
        headerName: '관리메모4',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo5',
        headerName: '관리메모5',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo6',
        headerName: '관리메모6',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo7',
        headerName: '관리메모7',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo8',
        headerName: '관리메모8',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo9',
        headerName: '관리메모9',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo10',
        headerName: '관리메모10',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    }

]