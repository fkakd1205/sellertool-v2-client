import { useEffect, useState } from "react";
import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import { numberFormatUtils } from "../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import InfiniteScrollObserver from "../../../../modules/observer/InfiniteScrollObserver";
import ReverseScrollObserver from "../../../../modules/observer/ReverseScrollObserver";
import ResizableTh from "../../../../modules/table/ResizableTh";
import { TableBox, TableWrapper } from "./styles/EditErpItemsModal.styled";
import CustomDateTimeSelector from "../../../../../components/date-time-selector/v1/CustomDateTimeSelector";
import CustomSearchOptionCodesModal from "../../../../../components/search-option-codes/v1/CustomSearchOptionCodesModal";

const TABLE_DATA_VIEW_SIZE = 40;
const TABLE_DATA_INC_DEC_SIZE = 20;

export default function DataTableComponent({
    tableHeaders,
    editErpItems,
    onChangeValueOfName,
    onChangeNumberValueOfName,
    onChangeOptionCodeAll,
    onChangeReleaseOptionCodeAll,
    onChangeOptionCode,
    onChangeReleaseOptionCode,
    onChangeChannelOrderDate,
    onChangeChannelOrderDateAll,
    onSelectClearErpItem
}) {
    const [prevViewSize, setPrevViewSize] = useState(0);
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);
    const [editAllOptionCodeModalOpen, setEditAllOptionCodeModalOpen] = useState(false);
    const [editAllReleaseOptionCodeModalOpen, setEditAllReleaseOptionCodeModalOpen] = useState(false);
    const [editOptionCodeModalOpen, setEditOptionCodeModalOpen] = useState(false);
    const [editReleaseOptionCodeModalOpen, setEditReleaseOptionCodeModalOpen] = useState(false);
    const [editChannelOrderDateModalOpen, setEditChannelOrderDateModalOpen] = useState(false);
    const [editAllChannelOrderDateModalOpen, setEditAllChannelOrderDateModalOpen] = useState(false);
    const [targetErpItemId, setTargetErpItemId] = useState(null);

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

    const handleOpenEditAllOptionCodeModal = () => {
        setEditAllOptionCodeModalOpen(true);
    }

    const handleCloseEditAllOptionCodeModal = () => {
        setEditAllOptionCodeModalOpen(false);
    }

    const handleOpenEditAllReleaseOptionCodeModal = () => {
        setEditAllReleaseOptionCodeModalOpen(true);
    }

    const handleCloseEditAllReleaseOptionCodeModal = () => {
        setEditAllReleaseOptionCodeModalOpen(false);
    }

    const handleChangeOptionCodeAll = (optionCode) => {
        onChangeOptionCodeAll(optionCode);
        handleCloseEditAllOptionCodeModal();
    }

    const handleChangeReleaseOptionCodeAll = (optionCode) => {
        onChangeReleaseOptionCodeAll(optionCode)
        handleCloseEditAllReleaseOptionCodeModal();
    }

    const handleOpenEditOptionCodeModal = (erpItemId) => {
        setTargetErpItemId(erpItemId);
        setEditOptionCodeModalOpen(true);
    }

    const handleCloseEditOptionCodeModal = () => {
        setEditOptionCodeModalOpen(false);
        setTargetErpItemId(null);
    }

    const handleOpenEditReleaseOptionCodeModal = (erpItemId) => {
        setTargetErpItemId(erpItemId);
        setEditReleaseOptionCodeModalOpen(true);
    }

    const handleCloseEditReleaseOptionCodeModal = () => {
        setEditReleaseOptionCodeModalOpen(false);
        setTargetErpItemId(null);
    }

    const toggleEditChannelOrderDateModalOpen = (setOpen, erpItemId) => {
        if (setOpen) {
            setTargetErpItemId(erpItemId);
        } else {
            setTargetErpItemId(null);
        }
        setEditChannelOrderDateModalOpen(setOpen);
    }

    const toggleEditAllChannelOrderDateModalOpen = (setOpen) => {
        setEditAllChannelOrderDateModalOpen(setOpen);
    }

    const handleChangeOptionCode = (optionCode) => {
        onChangeOptionCode(targetErpItemId, optionCode);
        handleCloseEditOptionCodeModal();
    }

    const handleChangeReleaseOptionCode = (optionCode) => {
        onChangeReleaseOptionCode(targetErpItemId, optionCode);
        handleCloseEditReleaseOptionCodeModal();
    }

    const handleChangeChannelOrderDate = (value) => {
        onChangeChannelOrderDate(targetErpItemId, value);
        toggleEditChannelOrderDateModalOpen(false);
    }

    const handleChangeChannelOrderDateAll = (value) => {
        onChangeChannelOrderDateAll(value);
        toggleEditAllChannelOrderDateModalOpen(false);
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
                                {tableHeaders?.map?.((r, index) => {
                                    if (r.name === 'optionCode') {
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
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='control-button-item'
                                                        onClick={() => handleOpenEditAllOptionCodeModal()}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src={'/images/icon/edit_note_808080.svg'}
                                                            />
                                                        </div>
                                                    </SingleBlockButton>
                                                </div>
                                            </ResizableTh>
                                        )
                                    }

                                    if (r.name === 'releaseOptionCode') {
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
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='control-button-item'
                                                        onClick={() => handleOpenEditAllReleaseOptionCodeModal()}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src={'/images/icon/edit_note_808080.svg'}
                                                            />
                                                        </div>
                                                    </SingleBlockButton>
                                                </div>
                                            </ResizableTh>
                                        )
                                    }

                                    if (r.name === 'channelOrderDate') {
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
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='control-button-item'
                                                        onClick={() => toggleEditAllChannelOrderDateModalOpen(true)}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src={'/images/icon/edit_note_808080.svg'}
                                                            />
                                                        </div>
                                                    </SingleBlockButton>
                                                </div>
                                            </ResizableTh>
                                        )
                                    }

                                    return (
                                        <ResizableTh
                                            key={index}
                                            className="fixed-header"
                                            scope="col"
                                            width={180}
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
                                        {tableHeaders.map((header) => {
                                            if (header.name === 'optionCode') {
                                                return (
                                                    <td
                                                        key={header.name}
                                                        className={`optionCodeTd`}
                                                    >
                                                        <SingleBlockButton
                                                            type='button'
                                                            className='button-item'
                                                            onClick={() => handleOpenEditOptionCodeModal(erpItem.id)}
                                                        >
                                                            {erpItem[header.name]}
                                                        </SingleBlockButton>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'releaseOptionCode') {
                                                return (
                                                    <td
                                                        key={header.name}
                                                        className={`optionCodeTd`}
                                                    >
                                                        <SingleBlockButton
                                                            type='button'
                                                            className='button-item'
                                                            onClick={() => handleOpenEditReleaseOptionCodeModal(erpItem.id)}
                                                        >
                                                            {erpItem[header.name]}
                                                        </SingleBlockButton>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'unit' || header.name === 'price' || header.name === 'deliveryCharge') {
                                                return (
                                                    <td key={header.name}>
                                                        <input
                                                            type='text'
                                                            className='input-item'
                                                            name={header.name}
                                                            value={numberFormatUtils.numberWithCommas(erpItem[header.name])}
                                                            placeholder={`${header.headerName}을(를) 입력`}
                                                            onChange={(e) => onChangeNumberValueOfName(e, erpItem.id)}
                                                        ></input>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'channelOrderDate') {
                                                return (
                                                    <td
                                                        key={header.name}
                                                    >
                                                        <SingleBlockButton
                                                            type='button'
                                                            className='button-item'
                                                            onClick={() => toggleEditChannelOrderDateModalOpen(true, erpItem.id)}
                                                        >
                                                            {erpItem[header.name] ? dateToYYYYMMDDhhmmss(erpItem[header.name]) : ''}
                                                        </SingleBlockButton>
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td key={header.name}>
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

            {editAllOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={editAllOptionCodeModalOpen}
                    onClose={handleCloseEditAllOptionCodeModal}
                    onSelect={(result) => handleChangeOptionCodeAll(result)}
                />
            }

            {editAllReleaseOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={editAllReleaseOptionCodeModalOpen}
                    onClose={handleCloseEditAllReleaseOptionCodeModal}
                    onSelect={(result) => handleChangeReleaseOptionCodeAll(result)}
                />
            }

            {editOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={editOptionCodeModalOpen}
                    onClose={handleCloseEditOptionCodeModal}
                    onSelect={(result) => handleChangeOptionCode(result)}
                />
            }

            {editReleaseOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={editReleaseOptionCodeModalOpen}
                    onClose={handleCloseEditReleaseOptionCodeModal}
                    onSelect={(result) => handleChangeReleaseOptionCode(result)}
                />
            }

            {editChannelOrderDateModalOpen &&
                <CustomDateTimeSelector
                    open={editChannelOrderDateModalOpen}
                    onClose={() => toggleEditChannelOrderDateModalOpen(false)}
                    onConfirm={(value) => handleChangeChannelOrderDate(value)}
                    initialDateTime={editErpItems.find(r => r.id === targetErpItemId)?.channelOrderDate}
                    label="판매채널 주문일시"
                />
            }

            {editAllChannelOrderDateModalOpen &&
                <CustomDateTimeSelector
                    open={editAllChannelOrderDateModalOpen}
                    onClose={() => toggleEditAllChannelOrderDateModalOpen(false)}
                    onConfirm={(value) => handleChangeChannelOrderDateAll(value)}
                    initialDateTime={new Date()}
                    label="판매채널 주문일시"
                />
            }
        </>
    );
}