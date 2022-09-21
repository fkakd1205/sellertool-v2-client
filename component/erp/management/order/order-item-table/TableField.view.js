import { useEffect, useRef } from 'react';
import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import InfiniteScrollObserver from '../../../../modules/observer/InfiniteScrollObserver';
import { TableFieldWrapper } from './OrderItemTable.styled';
import SortButton from '../../../../modules/button/SortButton'

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
                ref={props.tableScrollRef}
            >
                <table cellSpacing="0">
                    <colgroup>
                        <col className='col-5-3'></col>
                        {props.viewHeader?.headerDetail.details?.map((r, index) => {
                            return (
                                <col
                                    key={index}
                                    className='col-15-13'
                                ></col>
                            );
                        })}
                        <col className='col-5-3'></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                className="fixed-header"
                            >
                                선택
                            </th>
                            {props.viewHeader?.headerDetail.details?.map((r, index) => {
                                return (
                                    <th key={index} className="fixed-header" scope="col">
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                                        >
                                            <div>
                                                {r.customCellName}
                                            </div>
                                            <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                                <SortButton
                                                    buttonSize={25}
                                                    iconSize={16}
                                                    markPoint={r.matchedColumnName}
                                                ></SortButton>
                                            </div>
                                        </div>
                                    </th>
                                )
                            })}
                            <th
                                className="fixed-header fixed-col-right"
                                style={{ zIndex: 12 }}
                            >
                                수정
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.orderItemList &&
                            <>
                                {props.orderItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                                    let checked = props.isCheckedOne(r1.id)
                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={`${checked && 'tr-active'}`}
                                            onClick={(e) => props.onActionCheckOrderItem(e, r1)}
                                        >
                                            <td style={{ cursor: 'pointer' }}>
                                                <input type='checkbox' checked={checked} onChange={(e) => props.onActionCheckOrderItem(e, r1)}></input>
                                            </td>
                                            {props.viewHeader?.headerDetail.details?.map(r2 => {
                                                let matchedColumnName = r2.matchedColumnName;
                                                if (matchedColumnName === 'createdAt') {
                                                    return (
                                                        <td key={r2.cellNumber}>{dateToYYYYMMDDhhmmss(r1[matchedColumnName] || new Date())}</td>
                                                    )
                                                }
                                                return (
                                                    <td key={r2.cellNumber}>{r1[matchedColumnName]}</td>
                                                )
                                            })}
                                            <td className='fixed-col-right'>
                                                <button
                                                    type='button'
                                                    className='fix-button-el'
                                                    onClick={(e) => props.onActionOpenFixItemModal(e, r1)}
                                                >
                                                    <img
                                                        src={'/assets/icon/edit_black_icon.png'}
                                                        className='fix-button-icon'
                                                        alt=""
                                                    ></img>
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </>
                        }
                    </tbody>
                </table>
                <InfiniteScrollObserver
                    elementTagType={'div'}
                    totalSize={props.orderItemList.length}
                    startOffset={0}
                    endOffset={props.viewSize}
                    fetchData={props.onActionfetchMoreOrderItems}
                    loadingElementTag={
                        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                            로딩중...
                        </p>
                    }
                    endElementTag={
                        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                            마지막 데이터 입니다.
                        </p>
                    }
                />
            </div>
        </TableFieldWrapper>
    );
}