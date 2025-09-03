import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/web/pages/Home';
import { AdminLogin } from './pages/admin/auth/AdminLogin';
import { AdminPrivate } from './pages/admin/auth/AdminPrivate';
import { DashHome } from './pages/admin/pages/DashHome';
import { DashViewHomeBanner } from './pages/admin/pages/dashboard home/view/DashViewHomeBanner';
import { DashViewHomeAbout } from './pages/admin/pages/dashboard home/view/DashViewHomeAbout';
import { DashViewHomeGoals } from './pages/admin/pages/dashboard home/view/DashViewHomeGoals';
import { DashViewHomeManagement } from './pages/admin/pages/dashboard home/view/DashViewHomeManagement';
import { DashViewHomeManagementProfile } from './pages/admin/pages/dashboard home/view/DashViewHomeManagementProfile';
import { DashViewHomeGallery } from './pages/admin/pages/dashboard home/view/DashViewHomeGallery';
import { DashViewHomeTeamMember } from './pages/admin/pages/dashboard home/view/DashViewHomeTeamMember';
import { DashViewHomeTeamProfile } from './pages/admin/pages/dashboard home/view/DashViewHomeTeamProfile';
import { DashViewHomeDonation } from './pages/admin/pages/dashboard home/view/DashViewHomeDonation';
import { DashGoals } from './pages/admin/pages/DashGoals';
import { DashViewGoals } from './pages/admin/pages/dashboard goals/view/DashViewGoals';
import { DashboardGallery } from './pages/admin/pages/DashboardGallery';
import { DashViewGallery } from './pages/admin/pages/dashboard gallery/view/DashViewGallery';
import { DashViewParagraphHeading } from './pages/admin/pages/dashboard goals/view/DashViewParagraphHeading';
import { DashUpdateGoalsHeading } from './pages/admin/pages/dashboard goals/update/DashUpdateGoalsHeading';
import { DashUpdateGoalsParagraph } from './pages/admin/pages/dashboard goals/update/DashUpdateGoalsParagraph';
import { Gallery } from './pages/web/pages/Gallery';
import { DashAbout } from './pages/admin/pages/DashAbout';
import { DashViewAboutBanner } from './pages/admin/pages/dashboard about/view/DashViewAboutBanner';
import { About } from './pages/web/pages/About';
import { DashViewAboutParagraphSection } from './pages/admin/pages/dashboard about/view/DashViewAboutParagraphSection';
import { DashViewAboutParagraph } from './pages/admin/pages/dashboard about/view/DashViewAboutParagraph';
import { DashViewGalleryBanner } from './pages/admin/pages/dashboard gallery/view/DashViewGalleryBanner';
import { DashNews } from './pages/admin/pages/DashNews';
import { DashViewNewsBanner } from './pages/admin/pages/dashboard news/view/DashViewNewsBanner';
import { NewsEvents } from './pages/web/pages/News&Events';
import { DashViewNews } from './pages/admin/pages/dashboard news/view/DashViewNews';
import { Contact } from './pages/web/pages/Contact';
import { DashContact } from './pages/admin/pages/DashContact';
import { DashViewContactBanner } from './pages/admin/pages/dashboard contact/view/DashViewContactBanner';
import { DashQueries } from './pages/admin/pages/DashQueries';
import { DashTerms } from './pages/admin/pages/DashTerms';
import { DashViewTermsBanner } from './pages/admin/pages/dashboard terms/view/DashViewTermsBanner';
import { TermsConditions } from './pages/web/pages/TermsConditions';
import { DashViewTermsParagraphSection } from './pages/admin/pages/dashboard terms/view/DashViewTermsParagraphSection';
import { DashViewTermsParagraph } from './pages/admin/pages/dashboard terms/view/DashViewTermsParagraph';
import { PrivacyPolicy } from './pages/web/pages/PrivacyPolicy';
import { DashPrivacy } from './pages/admin/pages/DashPrivacy';
import { DashViewPrivacyBanner } from './pages/admin/pages/dashboard privacy/view/DashViewPrivacyBanner';
import { DashViewPrivacyParagraphSection } from './pages/admin/pages/dashboard privacy/view/DashViewPrivacyParagraphSection';
import { DashViewPrivacyParagraph } from './pages/admin/pages/dashboard privacy/view/DashViewPrivacyParagraph';
import { Register } from './pages/web/auth/Register';
import { Otp_Verification } from './pages/web/auth/Otp_Verification';
import { CreateProfile } from './pages/web/auth/CreateProfile';
import { Login } from './pages/web/auth/Login';
import { ForgotPassword } from './pages/web/auth/ForgotPassword';
import { ForgotOtp } from './pages/web/auth/ForgotOtp';
import { ChangePassword } from './pages/web/auth/ChangePassword';
import { WebPrivate } from './pages/web/auth/WebPrivate';
import { UserPanel } from './pages/web/pages/userpanel/UserPanel';
import { WebAdminLogin } from './pages/webadmin/auth/WebAdminLogin';
import WebAdminPrivate from './pages/webadmin/auth/WebAdminPrivate';
import { WebDashboard } from './pages/webadmin/pages/WebDashboard';
import { WebDashboardNotice } from './pages/webadmin/pages/WebDashboardNotice';
import { WebDashboardUsers } from './pages/webadmin/pages/WebDashboardUsers';
import { WebDashUserProfile } from './pages/webadmin/pages/WebDashUserProfile';
import { DashViewNotices } from './pages/webadmin/pages/web dashboard notices/view/DashViewNotices';
import { Notices } from './pages/web/pages/userpanel/Notices';
import { WebDashCertificates } from './pages/webadmin/pages/WebDashCertificates';
import { DashViewCertificate } from './pages/webadmin/pages/web dashboard certificates/view/DashViewCertificate';
import { Certificates } from './pages/web/pages/userpanel/Certificates';
import { Membership } from './pages/web/pages/userpanel/Membership';
import { UserDataContext } from './pages/web/pages/Context/UserDataContext';
import { IdCard } from './pages/web/pages/userpanel/IdCard';
import { AppointmentLetter } from './pages/web/pages/userpanel/AppointmentLetter';
import { DonateUs } from './pages/web/pages/userpanel/DonateUs';
import { Transactions } from './pages/web/pages/userpanel/Transactions';
import { ViewMembershipTransactions } from './pages/web/pages/userpanel/ViewMembershipTransactions';
import { Profile } from './pages/web/pages/userpanel/Profile';
import { WebDashboardTransactions } from './pages/webadmin/pages/WebDashboardTransactions';
import { WebDashboardMembershipTransactions } from './pages/webadmin/pages/WebDashboardMembershipTransactions';
import { Receipt } from './pages/web/pages/userpanel/Receipt';
import { MembershipReceipt } from './pages/web/pages/userpanel/MembershipReceipt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* website  */}
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<Otp_Verification />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/verify-otp" element={<ForgotOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route element={<UserDataContext />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/news' element={<NewsEvents />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route element={<WebPrivate />}>
            <Route path="/user-dashboard" element={<UserPanel />} />
            <Route path="/notice" element={<Notices />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/id-card" element={<IdCard />} />
            <Route path="/appointment-letter" element={<AppointmentLetter />} />
            <Route path="/donate-us" element={<DonateUs />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/membership-transactions" element={<ViewMembershipTransactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/receipt' element={<Receipt />} />
            <Route path='/membership-receipt' element={<MembershipReceipt />} />
          </Route>
        </Route>

        {/* dashboard  */}
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route element={<AdminPrivate />}>
          <Route path='/dash-home' element={<DashHome />} />
          <Route path='/view-home-banner-slides' element={<DashViewHomeBanner />} />
          <Route path='/view-home-about-section' element={<DashViewHomeAbout />} />
          <Route path='/view-home-goals' element={<DashViewHomeGoals />} />
          <Route path='/view-home-management' element={<DashViewHomeManagement />} />
          <Route path='/view-home-management-profile' element={<DashViewHomeManagementProfile />} />
          <Route path='/view-home-gallery' element={<DashViewHomeGallery />} />
          <Route path='/view-our-team-content' element={<DashViewHomeTeamMember />} />
          <Route path='/view-home-team-card' element={<DashViewHomeTeamProfile />} />
          <Route path='/view-home-donation' element={<DashViewHomeDonation />} />

          {/* dash goals  */}
          <Route path='/dash-goals' element={<DashGoals />} />
          <Route path='/view-home-Goals-cards' element={<DashViewGoals />} />
          <Route path='/view-home-paragraph-heading' element={<DashViewParagraphHeading />} />
          <Route path='/update-home-paragraph-heading' element={<DashUpdateGoalsHeading />} />
          <Route path='/update-home-paragraph-paragraph' element={<DashUpdateGoalsParagraph />} />

          {/* dash gallery  */}
          <Route path='/dash-gallery' element={<DashboardGallery />} />
          <Route path='/view-gallery' element={<DashViewGallery />} />
          <Route path='/view-gallery-banner' element={<DashViewGalleryBanner />} />
          {/* about  us */}
          <Route path='/dash-about' element={<DashAbout />} />
          <Route path='/view-about-banner' element={<DashViewAboutBanner />} />
          <Route path='/view-about-paragraph' element={<DashViewAboutParagraphSection />} />
          <Route path='/view-all-about-paragraph' element={<DashViewAboutParagraph />} />

          {/* news */}
          <Route path='/dash-news' element={<DashNews />} />
          <Route path='/view-news-banner' element={<DashViewNewsBanner />} />
          <Route path='/view-news' element={<DashViewNews />} />
          <Route path='/view-all-about-paragraph' element={<DashViewAboutParagraph />} />

          {/* contact */}
          <Route path='/dash-contact' element={<DashContact />} />
          <Route path='/view-contact-banner' element={<DashViewContactBanner />} />


          {/* terms & condition */}
          <Route path='/dash-terms' element={<DashTerms />} />
          <Route path='/view-terms-banner' element={<DashViewTermsBanner />} />
          <Route path='/view-terms-paragraph' element={<DashViewTermsParagraphSection />} />
          <Route path='/view-all-terms-paragraph' element={<DashViewTermsParagraph />} />

          {/* terms & condition */}
          <Route path='/dash-privacy' element={<DashPrivacy />} />
          <Route path='/view-privacy-banner' element={<DashViewPrivacyBanner />} />
          <Route path='/view-privacy-paragraph' element={<DashViewPrivacyParagraphSection />} />
          <Route path='/view-all-privacy-paragraph' element={<DashViewPrivacyParagraph />} />
        </Route>


        <Route path='/dash-login' element={<WebAdminLogin />} />
        <Route element={<WebAdminPrivate />}>
          <Route path='/dashboard' element={<WebDashboard />} />
          <Route path='/dash-notice' element={<WebDashboardNotice />} />
          <Route path='/view-all-notices' element={<DashViewNotices />} />
          <Route path='/dash-certificates' element={<WebDashCertificates />} />
          <Route path='/view-all-certicates' element={<DashViewCertificate />} />
          <Route path='/dash-queries' element={<DashQueries />} />
          <Route path='/dash-users' element={<WebDashboardUsers />} />
          <Route path='/view-user-profile' element={<WebDashUserProfile />} />
          <Route path='/dash-transactions' element={<WebDashboardTransactions />} />
          <Route path='/dash-membership-transactions' element={<WebDashboardMembershipTransactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
