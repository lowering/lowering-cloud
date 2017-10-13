package io.github.lowering.common.oauth.event;

import org.springframework.cloud.bus.event.RemoteApplicationEvent;

public class OAuth2SsoApplicationEvent extends RemoteApplicationEvent {

    public OAuth2SsoApplicationEvent() {
    }

    public OAuth2SsoApplicationEvent(Object source, String originService) {
        super(source, originService);
    }
}
