package io.github.lowering.common.session.listener;

import io.github.lowering.common.session.SessionContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.web.session.HttpSessionCreatedEvent;
import org.springframework.security.web.session.HttpSessionDestroyedEvent;

public class HttpSessionCreatedListener implements ApplicationListener<HttpSessionCreatedEvent> {

    @Autowired
    private SessionContextHolder sessionContextHolder;

    @Override
    public void onApplicationEvent(HttpSessionCreatedEvent event) {
        System.out.println(event.getSession());
        this.sessionContextHolder.setSession(event.getSession());
    }
}
