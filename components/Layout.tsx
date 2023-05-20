// import Alert from './Alert';
import Footer from   './Footer';
import Meta from './Meta';

type Props = {
    preview?: boolean;
    children: React.ReactNode;
}

const Layout = ({ preview, children }: Props) =>
    (
        <>
            <Meta/>
            <div className='min-h-screen'>
                {/*<Alert preview={preview}/>*/}
                <main>{children}</main>
            </div>
            <Footer/>
        </>
    )

export default Layout
