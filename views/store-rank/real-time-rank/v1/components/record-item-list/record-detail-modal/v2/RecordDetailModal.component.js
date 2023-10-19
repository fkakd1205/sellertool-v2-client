import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import ButtonFieldView from "./view/ButtonField.view";
import AdRankDetailFieldView from "./view/AdRankDetailField.view";
import { useEffect, useState } from "react";
import ViewControlFieldView from "./view/ViewControlField.view";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import { CustomProgressIcon } from "../../../../modules/progress/progress-icon/v1";
// import SubInfoFieldView from "./view/SubInfoField.view";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import RankDetailSkeletonFieldView from "./view/RankDetailSkeletonField.view";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { customBackdropController } from "../../../../../../../../components/backdrop/default/v1";
import FieldLoadingV2 from "../../../../../../../modules/loading/FieldLoadingV2";
import DetailControlFieldView from "./view/DetailControlField.view";
import useNRankRecordInfoHook from "./hooks/useNRankRecordInfoHook";
import { DetailRankTableComponent } from "../detail-rank-table/v2";
import _ from "lodash";

const customBackdropControl = customBackdropController();

export function RecordDetailModalComponent({
    open,
    onClose,
    record,
    createRecordInfoId,
    rankSearchInfo,
    currentPendingRecordIds,
    onSetCurrentPendingRecordIds,
    onSearchSubscriptionPlanSearchInfo
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const {
        onReqSearchNRankRecordDetails,
        onReqChangeNRankRecordStatusToPending,
        onReqCreateNRankRecordDetails,
        onReqSearchNRankRecordInfos
    } = useApiHook();

    const {
        recordDetails,
        adRecordDetails,
        openedSubInfoRecordDetailIds,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions
    } = useNRankRecordDetailHook({ record });

    const {
        recordInfos,
        selectedRecordInfo,
        currentRecordInfoIdx,
        lastSearchedRecordInfo,
        onSetCurrentRecordInfoIdx,
        onSetRecordInfos,
        onChangeSelectedRecordInfo
    } = useNRankRecordInfoHook({ record });

    const [isAdRankView, setIsAdRankView] = useState(false);
    const [isInitSearchLoading, setIsInitSearchLoading] = useState(false);

    const [detailGraphModalOpen, setDetailGraphModalOpen] = useState(false);

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!record) {
            return;
        }

        async function initialize() {
            setIsInitSearchLoading(true);
            await handleSearchNRankRecordInfos();
            setIsInitSearchLoading(false);
        }

        initialize();
    }, [record, wsId])

    useEffect(() => {
        if(!recordInfos) {
            return;
        }

        onSetCurrentRecordInfoIdx(recordInfos.length-1)
    }, [recordInfos])

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!selectedRecordInfo) {
            return;
        }

        async function fetchSearchDetails() {
            setIsInitSearchLoading(true);
            await handleSearchNRankRecordDetail()
            setIsInitSearchLoading(false);
        }

        fetchSearchDetails();
    }, [selectedRecordInfo, wsId])

    const handleChangeAdRankView = () => {
        setIsAdRankView(true);
    }

    const handleChangeRankView = () => {
        setIsAdRankView(false);
    }

    const handleSearchNRankRecordInfos = async () => {
        await onReqSearchNRankRecordInfos({
            params: { record_id: record.id },
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                let sortedResults = _.sortBy(results, 'created_at');
                onSetRecordInfos(sortedResults);
            }
        })
    }

    const handleSearchNRankRecordDetail = async () => {
        let selectedRecordInfoId = selectedRecordInfo?.id;

        await onReqSearchNRankRecordDetails({
            params: { record_info_id: selectedRecordInfoId},
            headers: { wsId: wsId }
        },{
            success: (results) => {
                let rankDetails = [];
                let adRankDetails = [];
                results.forEach(r => r.advertising_yn === 'y' ? adRankDetails.push(r) : rankDetails.push(r));
                onSetRecordDetails(rankDetails);
                onSetAdRecordDetails(adRankDetails);
            }
        })
    }

    const handleChangeNRankRecordStatusToPending = async () => {
        try {
            if(rankSearchInfo.allowed_search_count <= rankSearchInfo.searched_count) {
                throw new Error("금일 요청 가능한 횟수를 초과하였습니다.");
            }
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
            return;
        }

        customBackdropControl.showBackdrop();
        let recordId = record.id;
        await onReqChangeNRankRecordStatusToPending({
            headers: { wsId: wsId },
            params: { id: recordId },
            body: { record_info_id: createRecordInfoId }
        }, {
            success: () => {
                let recordIds = [...currentPendingRecordIds].concat(recordId);
                onSetCurrentPendingRecordIds(recordIds);
                handleCreateNRankRecordDetail();
                onSearchSubscriptionPlanSearchInfo();
            }
        })
        customBackdropControl.hideBackdrop();
    }

    const handleCreateNRankRecordDetail = async () => {
        await onReqCreateNRankRecordDetails({
            body: { record_id: record.id, record_info_id: createRecordInfoId },
            headers: { wsId: wsId }
        })
    }

    const handleOpenDetailGraphModal = (e) => {
        e.stopPropagation();

        let details = isAdRankView ? adRecordDetails : recordDetails;
        if(!details.length > 0 ) {
            let message = '조회데이터가 존재하지 않습니다.';

            customToast.error(message, {
                ...defaultOptions,
                toastId: message
            });
            return;    
        }

        setDetailGraphModalOpen(true);
    }


    const handleCloseDetailGraphModal = () => {
        setDetailGraphModalOpen(false);
    }

    let isPending = currentPendingRecordIds?.includes(record?.id);

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="sm"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>랭킹 조회</CustomDialog.Title>
                <Wrapper>
                    <RecordInfoFieldView
                        record={record}
                        lastSearchedRecordInfo={lastSearchedRecordInfo}
                    />
                    
                    {/* <SubInfoFieldView
                        record={record}
                    /> */}

                    <ButtonFieldView
                        lastSearchedRecordInfo={lastSearchedRecordInfo}
                        isPending={isPending}
                        isInitSearchLoading={isInitSearchLoading}
                        onSubmit={handleChangeNRankRecordStatusToPending}
                    />

                    <div style={{ position: 'relative' }}>
                        <DetailControlFieldView
                            isPending={isPending}
                            record={record}
                            recordInfos={recordInfos}
                            currentRecordInfoIdx={currentRecordInfoIdx}
                            selectedRecordInfo={selectedRecordInfo}
                            isAdRankView={isAdRankView}
                            recordDetails={recordDetails}
                            adRecordDetails={adRecordDetails}

                            onActionFoldAllOptions={onActionFoldAllOptions}
                            onActionUnfoldAllOptions={onActionUnfoldAllOptions}
                            onSetCurrentRecordInfoIdx={onSetCurrentRecordInfoIdx}
                            onChangeSelectedRecordInfo={onChangeSelectedRecordInfo}
                            onOpenDetailGraphModal={handleOpenDetailGraphModal}
                        />
                        {/* detail rank trend modal */}
                        {detailGraphModalOpen &&
                            <DetailRankTableComponent
                                open={detailGraphModalOpen}
                                onClose={() => handleCloseDetailGraphModal()}
                                record={record}
                                recordInfos={recordInfos}
                                recordDetails={isAdRankView ? adRecordDetails : recordDetails}
                            />
                        }
                    </div>

                    <ViewControlFieldView
                        isAdRankView={isAdRankView}
                        recordDetails={recordDetails}
                        adRecordDetails={adRecordDetails}
                        onChangeAdRankView={handleChangeAdRankView}
                        onChangeRankView={handleChangeRankView}
                    />

                    <div>
                        <div style={{ position: 'relative' }}>
                            {isPending &&
                                <>
                                    <CustomProgressIcon
                                        type={'sync'}
                                        color='var(--mainColor)'
                                        size={20}
                                        margin={20}
                                        isBackgroundBlur={true}
                                    />
                                    <RankDetailSkeletonFieldView />
                                </>
                            }

                            {!isPending &&
                                <>
                                    {isInitSearchLoading &&
                                        <FieldLoadingV2
                                            oxStyle={{
                                                borderRadius: '15px'
                                            }}
                                        />
                                    }

                                    {isAdRankView ?
                                        <AdRankDetailFieldView
                                            lastSearchedRecordInfo={lastSearchedRecordInfo}
                                            adRecordDetails={adRecordDetails}
                                            openedSubInfoRecordDetailIds={openedSubInfoRecordDetailIds}
                                            onAddOpenedSubInfoRecordDetailId={onAddOpenedSubInfoRecordDetailId}
                                            onRemoveOpenedSubInfoRecordDetailId={onRemoveOpenedSubInfoRecordDetailId}
                                        />
                                        :
                                        <RankDetailFieldView
                                            record={record}
                                            lastSearchedRecordInfo={lastSearchedRecordInfo}
                                            recordDetails={recordDetails}
                                            openedSubInfoRecordDetailIds={openedSubInfoRecordDetailIds}
                                            onAddOpenedSubInfoRecordDetailId={onAddOpenedSubInfoRecordDetailId}
                                            onRemoveOpenedSubInfoRecordDetailId={onRemoveOpenedSubInfoRecordDetailId}
                                        />
                                    }
                                </>
                            }
                        </div>
                    </div>

                    <div className='detail-info-text'>
                        <span>{currentRecordInfoIdx + 1}</span>
                        <span> / </span>
                        <span>{recordInfos?.length || 1}</span>
                    </div>
                </Wrapper>
            </CustomDialog>
        </>
    )
}