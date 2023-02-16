import styled from 'styled-components';
import { getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import CustomBlockButton from '../../block-button/v1/CustomBlockButton';

const ButtonItem = styled(CustomBlockButton)`
    font-size: 11px;
    width: 60px;
    height: 30px;
    margin-right: -1px;
    margin-top: -1px;
    color: #404040;
`;

export default function LastMonthButton({
    callback,
    ...props
}) {
    const handleClickButton = () => {
        let currDateTime = new Date();
        let YEAR = currDateTime.getFullYear();
        let MONTH = currDateTime.getMonth();
        let DATE = currDateTime.getDate();

        let result = {
            startDateTime: getStartDate(new Date(YEAR, MONTH - 1, 1)),
            endDateTime: getEndDate(new Date(YEAR, MONTH, 0))
        }
        callback(result);
    }

    return (
        <ButtonItem
            type='button'
            onClick={() => handleClickButton()}
            {...props}
        >
            저번달
        </ButtonItem>
    );
}