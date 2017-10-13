package io.github.lowering.common.session;

import org.springframework.context.event.EventListener;
import org.springframework.security.web.session.HttpSessionCreatedEvent;
import org.springframework.security.web.session.HttpSessionDestroyedEvent;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SessionContextHolder {

    private Map<String,HttpSession> context;

    private SessionContextHolder(){
        this.context = new ConcurrentHashMap<>();
    }

    private static class Creator {
        private static final SessionContextHolder INSTANCE = new SessionContextHolder();
    }

    public static SessionContextHolder getInstance() {
        return Creator.INSTANCE;
    }

    public void setSession(HttpSession session){
        this.context.putIfAbsent(session.getId(),session);
    }

    public HttpSession getSession(String id){
        return this.context.get(id);
    }

    public HttpSession removeSession(String id){
        HttpSession session = getSession(id);
        this.context.remove(id);
        return session;
    }
}
