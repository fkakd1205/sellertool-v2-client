import Head from 'next/head';
import MainComponent from '../../../../../views/erp/collection/create/view-header';
import FooterMain from '../../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../../views/navbar/secondary-navbar-v2';

export default function ErpCollectionCreateViewHeaderPage(props) {
    return (
        <>
            <Head>
                <title>뷰헤더 생성 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}