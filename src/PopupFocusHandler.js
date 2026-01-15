import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const PopupFocusHandler = () => {
  const map = useMap();

  useEffect(() => {
    // When a popup opens, focus the first focusable element inside it
    function handlePopupOpen(e) {
      const popupNode = e.popup.getElement();

      // Use a small timeout to allow React to inject (potentially focusable) portal content to the DOM.
      setTimeout(() => {
        const contentContainer = popupNode.querySelector('.leaflet-popup-content');
        const focusable = contentContainer?.querySelector(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusable) {
          focusable.focus();
        } else {
          const closeBtn = popupNode.querySelector('.leaflet-popup-close-button');
          if (closeBtn) {
            closeBtn.focus();
          }
        }
      }, 50);
    }

    // When a popup closes, return focus to the marker which spawned it
    function handlePopupClose(e) {
      const sourceMarker = e.popup._source;

      if (sourceMarker && sourceMarker.getElement) {
        const markerNode = sourceMarker.getElement();
        if (markerNode) {
          markerNode.focus();
        }
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        map.closePopup();
      }
    }

    map.on('popupopen', handlePopupOpen);
    map.on('popupclose', handlePopupClose);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      map.off('popupopen', handlePopupOpen);
      map.off('popupclose', handlePopupClose);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [map]);

  return null;
};

export default PopupFocusHandler;
