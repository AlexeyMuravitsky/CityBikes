import { PropsWithChildren } from "react";
import { selectAllFavoriteStations } from "@/store/favoriteStations";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PageLayout.scss";

interface PageLayoutProps {}

const PageLayout = ({ children }: PropsWithChildren<PageLayoutProps>) => {
  const favoriteStations = useSelector(selectAllFavoriteStations);
  const favoriteStationsCount = favoriteStations.length;
  const hasFavoriteStations = favoriteStationsCount !== 0;

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header__title">
          CityBikes
        </Link>
        <Link to="/favorites/" className="header__favorites-btn">
          {hasFavoriteStations && (
            <div className="header__favorites-count">
              {favoriteStationsCount}
            </div>
          )}
          Favorites
        </Link>
      </header>
      <main> {children}</main>
    </div>
  );
};

export default PageLayout;
