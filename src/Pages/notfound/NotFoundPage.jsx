import { Header } from '../../components/Header';
import { Link } from 'react-router';
import './NotFoundPage.css';

export function NotFoundPage({ cart }) {
    return (
        <>
            <Header cart={cart} />

            <div className="not-found-page">
                <div className="not-found-container">

                    <h1 className="not-found-code">
                        404
                    </h1>

                    <h2 className="not-found-title">
                        Page Not Found
                    </h2>

                    <p className="not-found-message">
                        Sorry, the page you're looking for doesn't exist.
                        It may have been moved or the URL may be incorrect.
                    </p>

                    <Link
                        to="/"
                        className="not-found-button"
                    >
                        Back to Home
                    </Link>

                </div>
            </div>
        </>
    );
}