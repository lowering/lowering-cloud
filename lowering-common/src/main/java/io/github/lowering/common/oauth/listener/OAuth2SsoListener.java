package io.github.lowering.common.oauth.listener;

import io.github.lowering.common.oauth.event.OAuth2SsoApplicationEvent;
import org.springframework.context.ApplicationListener;

public class OAuth2SsoListener implements ApplicationListener<OAuth2SsoApplicationEvent>{

    @Override
    public void onApplicationEvent(OAuth2SsoApplicationEvent event) {
        System.out.println(event);
    }
}
