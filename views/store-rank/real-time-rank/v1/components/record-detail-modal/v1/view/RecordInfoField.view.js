import { CustomBoxImage } from "../../../../modules";
import { dateToHHmm, dateToYYYYMMDD } from "../../../../utils/dateFormatUtils";
import { LabelGroup, Wrapper } from "../styles/RecordInfo.styled";

export default function RecordInfoFieldView({
    record,
    targetRecordInfo
}) {
    return (
        record &&
        <Wrapper>
            <div>
                <CustomBoxImage
                    src={targetRecordInfo?.thumbnail_url}
                    size='90px'
                />
            </div>
            <div>
                <LabelGroup>
                    <div style={{ width: '100%' }}>
                        <span className='content-value' style={{ color: 'var(--mainColor)' }}>{record.mall_name}</span>
                        <span> | </span>
                        <span className='content-value'>{record.keyword}</span>
                    </div>
                </LabelGroup>
                <LabelGroup style={{ color: '#808080' }}>
                    <span>최근조회 (</span>
                    <span>
                        {targetRecordInfo ?
                            <>
                                <span>{dateToYYYYMMDD(targetRecordInfo.created_at)} </span>
                                <span>{dateToHHmm(targetRecordInfo.created_at)}</span>
                            </>
                            :
                            '-'
                        }
                    </span>
                    <span>)</span>
                </LabelGroup>
            </div>
        </Wrapper>
    )
}