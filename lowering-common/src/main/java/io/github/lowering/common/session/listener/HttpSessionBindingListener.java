package io.github.lowering.common.session.listener;

import io.github.lowering.common.session.SessionContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionBindingEvent;
import java.util.Objects;

@WebListener
public class HttpSessionBindingListener implements javax.servlet.http.HttpSessionBindingListener {
    @Autowired
    private SessionContextHolder sessionContextHolder;

    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        String name = event.getName();
        System.out.println(name);
        if (Objects.equals(name, HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY)) {
            System.out.println(event.getValue());
        }
    }

    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {

    }
}
